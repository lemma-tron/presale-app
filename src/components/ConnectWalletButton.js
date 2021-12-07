import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import useAuth from "../hooks/useAuth";
import WalletCard from "../widgets/WalletCard";
import config from "../widgets/config";
import formatAddress from "../libs/formatAddress";
import { Modal } from "react-responsive-modal";

import { useWeb3React } from "@web3-react/core";

const CONNECT_MSG = "Connect Wallet";
const DEFAULT_SEC_MSG = "Binance Smart Chain";
const CONNECTED_MSG = "Connected";

const ConnectWalletButton = () => {
  const { account } = useWeb3React();

  const { login, logout } = useAuth();
  const [connected, setConnected] = useState(false);
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);

  function openConnectModal() {
    setConnectModalIsOpen(true);
  }

  function closeConnectModal() {
    setConnectModalIsOpen(false);
  }

  function openAccountModal() {
    setAccountModalIsOpen(true);
  }

  function closeAccountModal() {
    setAccountModalIsOpen(false);
  }

  useEffect(() => {
    if (account) {
      setConnected(true);
    }
  }, [account]);

  return (
    <div>
      <button
        className="btn btn-outline-light text-left"
        type="button"
        onClick={connected ? openAccountModal : openConnectModal}
      >
        <div className="row walletbtn-content">
          <div className="col-9">
            <span className="connect-wallet-text">
              {connected ? CONNECTED_MSG : CONNECT_MSG}
            </span>
            <br />
            <span className="network-text">
              {connected ? formatAddress(account) : DEFAULT_SEC_MSG}
            </span>
            <br />
            <span className="extra-msg">
              {connected ? "(Click here to logout)" : "(Get started)"}
            </span>
          </div>
          <div className="col-3 text-right">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </button>
      <Modal
        open={connectModalIsOpen}
        onClose={closeConnectModal}
        showCloseIcon={false}
        blockScroll={true}
        classNames={{
          overlay: "connectModalOverlay",
          modal: "connectModal",
        }}
        center
      >
        <div className="connect-wallet-header">
          <span className="text">Connect Wallet</span>
          <button className="close-button" onClick={closeConnectModal}>
            <img src="/assets/cross.png" />
          </button>
        </div>

        <div className="walletCardDiv">
          {config.map((entry, index) => (
            <WalletCard
              key={entry.title}
              login={login}
              walletConfig={entry}
              onDismiss={closeConnectModal}
            />
          ))}
        </div>
      </Modal>

      <Modal
        open={accountModalIsOpen}
        onClose={closeAccountModal}
        center
      ></Modal>
    </div>
  );
};

export default ConnectWalletButton;
