import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faExternalLinkAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

import useAuth from "../hooks/useAuth";
import WalletCard from "../widgets/WalletCard";
import config from "../widgets/config";
import formatAddress from "../libs/formatAddress";
import { Modal } from "react-responsive-modal";

import { useWeb3React } from "@web3-react/core";

import { toast } from "react-toastify";

const CONNECT_MSG = "Connect Wallet";
const DEFAULT_SEC_MSG = "Binance Smart Chain";
const CONNECTED_MSG = "Connected";

const ConnectWalletButton = () => {
  const { account } = useWeb3React();

  const { login, logout } = useAuth();
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

  const logoutWithClose = (e) => {
    e.preventDefault();
    setAccountModalIsOpen(false);

    // logout after 1 secs
    setTimeout(() => logout(), 500);
  };

  const notifyCopied = () =>
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    });

  const copyAddress = (e, address) => {
    e.preventDefault();
    navigator.clipboard.writeText(address);
    notifyCopied();
  };

  return (
    <div>
      <button
        className="btn btn-outline-light text-left"
        type="button"
        onClick={account ? openAccountModal : openConnectModal}
      >
        <div className="row walletbtn-content">
          <div className="col-9">
            <span className="connect-wallet-text">
              {account ? CONNECTED_MSG : CONNECT_MSG}
            </span>
            <br />
            <span className="network-text">
              {account ? formatAddress(account) : DEFAULT_SEC_MSG}
            </span>
            <br />
            <span className="extra-msg">
              {account ? "(Click here to disconnect)" : "(Get started)"}
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
        <div className="wallet-header">
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
        showCloseIcon={false}
        blockScroll={true}
        classNames={{
          overlay: "accountModalOverlay",
          modal: "accountModal",
        }}
        center
      >
        <div className="wallet-header">
          <span className="text">Your Wallet</span>
          <button className="close-button" onClick={closeAccountModal}>
            <img src="/assets/cross.png" />
          </button>
        </div>

        <div className="accountWalletCardDiv">
          <span className="account">{account}</span>
          <div className="account-detail">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={`https://bscscan.com/address/${account}`}
              className="viewbsc"
            >
              <span>View on BSC</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
            <div
              className="copyAddress"
              onClick={(e) => copyAddress(e, account)}
            >
              <span>Copy Address</span>
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </div>
          <div className="logoutwallet">
            <button className="logout-button" onClick={logoutWithClose}>
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConnectWalletButton;
