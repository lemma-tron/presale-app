import { useEffect } from "react";
import { connectorLocalStorageKey } from "../widgets/config";
import { ConnectorNames } from "../widgets/types";
import useAuth from "./useAuth";

const _binanceChainListener = async () => (resolve) =>
  Object.defineProperty(window, "BinanceChain", {
    get() {
      return this.bsc;
    },
    set(bsc) {
      this.bsc = bsc;

      resolve();
    },
  });

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC;
      const isBinanceChainDefined = Reflect.has(window, "BinanceChain");

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId));
        return;
      }

      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
