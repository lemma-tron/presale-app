import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import formatAddress from "../utils/formatAddress";

const CONNECT_MSG = "Connect Wallet";
const DEFAULT_SEC_MSG = "Binance Smart Chain";
const CONNECTED_MSG = "Connected";

const ConnectWalletButton = () => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [chainId, setChainId] = useState(1);
  const [networkId, setNetworkId] = useState(1);
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState(false);

  const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
    };
    return providerOptions;
  };

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions: getProviderOptions(),
    });

    setWeb3Modal(web3Modal);
  }, []);

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();

    setChainId(1);
    setNetworkId(1);
    setConnected(false);
    setAddress("");
    setProvider(null);
    setWeb3(null);
  };

  const subscribeProvider = async (web3, provider) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => resetApp());
    provider.on("accountsChanged", async (accounts) => {
      setAddress(accounts[0]);
    });
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId();
      setChainId(chainId);
      setNetworkId(networkId);
    });

    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId();
      setChainId(chainId);
      setNetworkId(networkId);
    });
  };

  const initWeb3 = (provider) => {
    const web3 = new Web3(provider);
    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });
    return web3;
  };

  const onConnect = async () => {
    await web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    const web3 = initWeb3(provider);
    await subscribeProvider(web3, provider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.chainId();

    setWeb3(web3);
    setProvider(provider);
    setChainId(chainId);
    setNetworkId(networkId);
    setConnected(true);
    setAddress(address);
  };

  return (
    <button
      className="btn btn-outline-light text-left"
      type="button"
      disabled={false}
      onClick={connected ? resetApp : onConnect}
    >
      <div className="row walletbtn-content">
        <div className="col-9">
          <span className="connect-wallet-text">{connected ? CONNECTED_MSG : CONNECT_MSG}</span>
          <br />
          <span className="network-text">{connected ? formatAddress(address) : DEFAULT_SEC_MSG}</span>
          <br />
          <span className="extra-msg">{connected ? "(Click here to logout)" : "(Get started)"}</span>
        </div>
        <div className="col-3 text-right">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </button>
  );
};

export default ConnectWalletButton;
