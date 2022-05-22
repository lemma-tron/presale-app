import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
} from "react";
import { toast } from "react-toastify";
import { useClaim } from "../hooks/useClaim";
import { usePresaleLema, usePresaleLemaPublic } from "../hooks/useContracts";
import { useRefund } from "../hooks/useRefund";
import { formatNumber, getBalanceNumber } from "../libs/formatBalance";
import { useWeb3React } from "@web3-react/core";

export const BusdInformation = forwardRef((props, ref) => {
  const { account } = useWeb3React();

  const [busdRaised, setBUSDRaised] = useState(0);
  const [lemaToBeDep, setLEMAToBeDep] = useState(0);
  const [tokenClaimed, setTokenClaimed] = useState(0);
  const [busdDep, setBUSDDep] = useState(0);
  const [lemaToClaim, setLEMAToClaim] = useState(0);
  const [isClaimable, setIsClaimable] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [requestedClaim, setRequestedClaim] = useState(false);
  const [requestedRefund, setRequestedRefund] = useState(false);
  const presaleContract = usePresaleLema();
  const presaleContractPublic = usePresaleLemaPublic();
  const { onClaim } = useClaim(presaleContract, account);
  const { onRefund } = useRefund(presaleContract, account);

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });

  useImperativeHandle(ref, () => ({
    fetchContractDataFromOutside() {
      fetchPersonalContractData();
    },
    fetchExtraInfo() {
      fetchExtraInformation();
    },
  }));

  const fetchExtraInformation = async () => {
    if (presaleContractPublic) {
      presaleContractPublic.methods.tokenClaimable().call(function (err, res) {
        setIsClaimable(res);
      });

      presaleContractPublic.methods.isRefunding().call(function (err, res) {
        setIsRefunding(res);
      });
    }
  };

  const fetchTotalDataOnly = async () => {
    if (presaleContractPublic) {
      presaleContractPublic.methods.busdRaised().call(function (err, res) {
        setBUSDRaised(res);
      });

      presaleContractPublic.methods.tokensRaised().call(function (err, res) {
        setLEMAToBeDep(res);
      });

      presaleContractPublic.methods.tokensClaimed().call(function (err, res) {
        setTokenClaimed(res);
      });
    }
  };

  const fetchPersonalContractData = async () => {
    if (presaleContract && account) {
      presaleContract.methods
        .presaleBalances(account)
        .call(function (err, res) {
          setBUSDDep(res);
        });

      presaleContract.methods
        .tokenToBeTransferred(account)
        .call(function (err, res) {
          setLEMAToClaim(res);
        });
    }
  };

  const handleRefund = useCallback(async () => {
    try {
      setRequestedRefund(true);
      await onRefund();
      setRequestedRefund(false);

      fetchPersonalContractData();
    } catch (e) {
      setRequestedRefund(false);
      console.error(e);
      notifyError("Failed to refund !");
    }
  }, [onRefund]);

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true);
      await onClaim();
      setRequestedClaim(false);

      fetchPersonalContractData();
    } catch (e) {
      setRequestedClaim(false);
      console.error(e);
      notifyError("Failed to claim !");
    }
  }, [onClaim]);

  const subscribeToBUSDDeposited = async () => {
    if (presaleContractPublic) {
      presaleContractPublic.events
        .BUSDDeposited({
          fromBlock: "latest",
        })
        .on("data", function (event) {
          fetchTotalDataOnly();
        })
        .on("error", console.error);
    }
  };

  const subscribeToTokenClaimed = async () => {
    if (presaleContractPublic) {
      presaleContractPublic.events
        .TokenClaimed({
          fromBlock: "latest",
        })
        .on("data", function (event) {
          fetchTotalDataOnly();
        })
        .on("error", console.error);
    }
  };

  const subscribeToRefundClaimed = async () => {
    if (presaleContractPublic) {
      presaleContractPublic.events
        .RefundClaimed({
          fromBlock: "latest",
        })
        .on("data", function (event) {
          fetchTotalDataOnly();
        })
        .on("error", console.error);
    }
  };

  useEffect(() => {
    fetchTotalDataOnly();
    fetchExtraInformation();
    subscribeToBUSDDeposited();
    subscribeToTokenClaimed();
    subscribeToRefundClaimed();
  }, []);

  useEffect(() => {
    if (account) {
      fetchPersonalContractData();
    } else {
      setBUSDDep(0);
      setLEMAToClaim(0);
    }
  }, [account]);

  return (
    <div>
      <div className="p-3" />
      <div className="busdinformation text-center">
        <div className="busdinformation-content-1">
          <div className="busdcount">
            <div>Total BUSD deposited</div>
            <div className="custom-font token-count">
              {getBalanceNumber(busdRaised)}
            </div>
          </div>
          <hr />
          <div className="lemacount">
            <div>Total LEMA to be distributed</div>
            <div className="custom-font token-count">
              {lemaToBeDep > 0 ? `~${formatNumber(getBalanceNumber(lemaToBeDep), 3)}`: 0}
            </div>
            <div>LEMA claimed: {tokenClaimed > 0 ? `~${formatNumber(getBalanceNumber(tokenClaimed), 3)}`:0}</div>
          </div>
        </div>

        <div className="busdinformation-content-2">
          <div className="row busdcount alignitems-center">
            <div className="col-7">
              Your BUSD deposit: <br />
            </div>
            <div className="col-5 custom-font token-count-personal">
              {getBalanceNumber(busdDep)}
            </div>
          </div>
          <div className="row lemacount alignitems-center">
            <div className="col-7">LEMA to claim: </div>
            <div className="col-5 custom-font token-count-personal">
              {lemaToClaim > 0 ? `~${formatNumber(getBalanceNumber(lemaToClaim), 3)}` : 0}
            </div>
          </div>
          <div>
            {isRefunding ? (
              <button
                className="btn btn-outline-light claim-button"
                type="button"
                disabled={requestedRefund}
                onClick={handleRefund}
              >
                <span>Refund BUSD</span>
              </button>
            ) : (
              <button
                className="btn btn-outline-light claim-button"
                type="button"
                disabled={!isClaimable || requestedClaim}
                onClick={handleClaim}
              >
                <span>Claim LEMA</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
