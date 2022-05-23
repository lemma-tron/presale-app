import React, { useState, useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
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
import { formatNumber, getBalanceNumber } from "../libs/formatBalance";

export default function PresaleAction(props) {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [requestedDeposit, setRequestedDeposit] = useState(false);
  const [validBUSD, setValidBUSD] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [lemaValue, setLEMAValue] = useState('');
  const [busdValue, setBUSDValue] = useState('');
  const [lemaPrice, setLemaPrice] = useState(0.0005);
  const busdContract = useBUSDToken();
  const presaleContract = usePresaleLema();
  const presaleLemaVaultContract = usePresaleLemaVault();
  
  const { account } = useWeb3React();
  const { onApprove } = useApprove(busdContract, account);
  const { onDeposit } = useDeposit(presaleContract, account);

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });

  const fetchAllowance = async () => {
    if (busdContract && account) {
      const res = await busdContract.methods
        .allowance(account, presaleLemaVaultContract.options.address)
        .call();
      const allowance = new BigNumber(res);
      setIsApproved(account && allowance && allowance.isGreaterThan(0));
    }
  };

  const getCurrentLemaPrice = async () => {
    if (presaleContract) {
      presaleContract.methods.getPrice().call(function (err, price) {
        setLemaPrice(getBalanceNumber(price));
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

      setBUSDValue('');
      setLEMAValue('');

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
    getCurrentLemaPrice();
    subscribeToFinalized();
  }, []);

  useEffect(() => {
    fetchAllowance();
  }, [account]);

  const handleInputSelect = async (e) => {
    e.preventDefault();
    getCurrentLemaPrice();
  };

  const handleValueChange = async (e) => {
    const value = e.currentTarget.value;
    setBUSDValue(value);

    if (value > 0 && isNumeric(value)) {
      setLEMAValue(formatNumber(value / lemaPrice, 3));
      setValidBUSD(true);
    } else {
      setValidBUSD(false);
      setLEMAValue('');
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
            Current Price 1 BUSD ≈ {lemaPrice ? formatNumber(1/lemaPrice, 3) : formatNumber(1/0.0005, 3)} LEMA
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
                      value={busdValue}
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
                    !account || requestedDeposit || isEnded || !validBUSD
                  }
                  onClick={handleDeposit}
                >
                  <span>Deposit BUSD</span>
                </button>
              ) : (
                <button
                  className="btn btn-outline-light buy-button"
                  type="button"
                  disabled={!account || requestedApproval || isEnded}
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
