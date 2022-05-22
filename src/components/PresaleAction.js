import React, { useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import ConnectWalletButton from "./ConnectWalletButton";
import { useApprove } from "../hooks/useApprove";
import {
  useBUSDToken,
  usePresaleLema,
  usePresaleLemaVault,
} from "../hooks/useContracts";
import { useDeposit } from "../hooks/useDeposit";
import { isNumeric } from "../libs/validateBUSD";
import { calculateRate } from "../libs/calculateRate";
import { formatNumber, getBalanceNumber } from "../libs/formatBalance";

export default function PresaleAction(props) {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [requestedDeposit, setRequestedDeposit] = useState(false);
  const [validBUSD, setValidBUSD] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [lemaValue, setLEMAValue] = useState(0);
  const [busdValue, setBUSDValue] = useState(0);
  const [busdRate, setBUSDRate] = useState(40);
  const busdContract = useBUSDToken();
  const presaleContract = usePresaleLema();
  const presaleLemaVaultContract = usePresaleLemaVault();
  const { onApprove } = useApprove(busdContract, props.account);
  const { onDeposit } = useDeposit(presaleContract, props.account);

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });

  const fetchAllowance = async () => {
    if (busdContract && props.account) {
      const res = await busdContract.methods
        .allowance(props.account, presaleLemaVaultContract.options.address)
        .call();
      const allowance = new BigNumber(res);
      setIsApproved(props.account && allowance && allowance.isGreaterThan(0));
    }
  };

  const calculateBUSDRate = async () => {
    if (presaleContract) {
      presaleContract.methods.busdRaised().call(function (err, busdRaised) {
        setBUSDRate(calculateRate(getBalanceNumber(busdRaised)));
      });
    }
  };

  const checkPresaleIsEnded = async () => {
    if (presaleContract) {
      presaleContract.methods.isEnded().call(function (err, res) {
        setIsEnded(res);

        if (props.busdInformationRef) {
          props.busdInformationRef.current.fetchExtraInfo();
        }
      });
    }
  };

  const subscribeToFinalized = async () => {
    if (presaleContract) {
      presaleContract.events
        .Finalized({
          fromBlock: "latest",
        })
        .on("data", function (event) {
          checkPresaleIsEnded();
        })
        .on("error", console.error);
    }
  };

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      setRequestedApproval(false);

      fetchAllowance();
    } catch (e) {
      setRequestedApproval(false);
      console.error(e);
      notifyError("Failed to approve !");
    }
  }, [onApprove]);

  const handleDeposit = useCallback(async () => {
    try {
      setRequestedDeposit(true);
      await onDeposit(busdValue);
      setRequestedDeposit(false);

      if (props.busdInformationRef) {
        props.busdInformationRef.current.fetchContractDataFromOutside();
      }
    } catch (e) {
      setRequestedDeposit(false);
      console.error(e);
      notifyError("Failed to deposit !");
    }
  }, [onDeposit]);

  useEffect(() => {
    checkPresaleIsEnded();
    calculateBUSDRate();
    subscribeToFinalized();
  }, []);

  useEffect(() => {
    fetchAllowance();
  }, [props.account]);

  const handleInputSelect = async (e) => {
    e.preventDefault();
    calculateBUSDRate();
  };

  const handleValueChange = async (e) => {
    const value = e.currentTarget.value;
    setBUSDValue(value);

    if (value > 0 && isNumeric(value)) {
      setLEMAValue(formatNumber(busdRate * value, 3));
      setValidBUSD(true);
    } else {
      setValidBUSD(false);
      setLEMAValue(0);
    }
  };

  return (
    <div className="presaleaction">
      <div className="p-3" />
      <div className="row alignitems-center">
        <div className="col-md-3">
          <div className="presalewallet">
            <ConnectWalletButton />
          </div>
        </div>
        <div className="col-md-9 presaledeposit">
          <div className="current-lema-rate">
            Current Price 1 BUSD ≈ {formatNumber(busdRate, 2)} LEMA
          </div>
          <div className="row alignitems-center presaleaction-card">
            <div className="col-md-9 presale-transaction">
              <div className="row alignitems-center">
                <div className="col-md-5">
                  <div className="input-group">
                    <span>
                      <img src="/assets/coin-busd.png" alt="busd-coin" />
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      className="frm form-control busd-input"
                      aria-label="busd-amount"
                      aria-describedby="busd-amount"
                      name="busd"
                      min="0"
                      max="10000"
                      onSelect={handleInputSelect}
                      onChange={handleValueChange}
                    />
                    <span>BUSD</span>
                  </div>
                </div>
                <div className="col-md-2 text-center exchange-icon-div">
                  <FontAwesomeIcon
                    icon={faExchangeAlt}
                    className="exchange-icon"
                  />
                </div>
                <div className="col-md-5">
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      className="frm form-control lema-input"
                      aria-label="lema-amount"
                      aria-describedby="lema-amount"
                      name="lema"
                      value={lemaValue}
                      disabled
                    />
                    <span>LEMA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              {isApproved ? (
                <button
                  className="btn btn-outline-light buy-button"
                  type="button"
                  disabled={
                    !props.account || requestedDeposit || isEnded || !validBUSD
                  }
                  onClick={handleDeposit}
                >
                  <span>Deposit BUSD</span>
                </button>
              ) : (
                <button
                  className="btn btn-outline-light buy-button"
                  type="button"
                  disabled={!props.account || requestedApproval || isEnded}
                  onClick={handleApprove}
                >
                  <span>Approve BUSD</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
