
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

export const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: process.env.REACT_APP_RPC_URL,
        },
        chainId: process.env.REACT_APP_CHAIN_ID,
      },
    },
    "custom-binancechainwallet": {
      display: {
        logo: "../assets/binance_wallet_logo.png",
        name: "Binance Chain Wallet",
        description: "Connect to your Binance Chain Wallet",
      },
      package: true,
      connector: async () => {
        let provider = null;
        if (typeof window.BinanceChain !== "undefined") {
          provider = window.BinanceChain;
          try {
            await provider.request({ method: "eth_requestAccounts" });
          } catch (error) {
            throw new Error("User Rejected");
          }
        } else {
          throw new Error("No Binance Chain Wallet found");
        }
        return provider;
      },
    },
  };
  return providerOptions;
};
