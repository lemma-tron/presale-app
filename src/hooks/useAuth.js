import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { toast } from "react-toastify";
import { connectorLocalStorageKey } from "../widgets/config";
import { connectorsByName } from "../libs/web3React";
import { setupNetwork } from "../libs/wallet";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const notifyError = useCallback(
    (message) =>
      toast.error(message, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      }),
    []
  );

  const login = useCallback(
    (connectorID) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              notifyError("No provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector;
                walletConnector.walletConnectProvider = null;
              }
              notifyError("Please authorize to access your account");
            } else {
              notifyError(error.message);
            }
          }
        });
      } else {
        notifyError("The connector config is wrong");
      }
    },
    [activate, notifyError]
  );

  const logout = useCallback(() => {
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
