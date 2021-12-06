import {
  getPresaleNenAddress,
  getPresaleNenVaultAddress,
  getBUSDAddress,
  getNenTokenAddress,
} from "../libs/addressHelpers";
import { useWeb3, useWeb3Public } from "../libs/useWeb3";

import busdToken from "../config/abis/BEP20.json";
import nenToken from "../config/abis/NenToken.json";
import presaleNen from "../config/abis/PresaleNen.json";
import presaleNenVault from "../config/abis/PresaleNenRefundVault.json";

const useContract = (abiArtifact, address) => {
  const web3 = useWeb3();
  return new web3.eth.Contract(abiArtifact, address);
};

const useContractPublic = (abiArtifact, address) => {
  const web3 = useWeb3Public();
  return new web3.eth.Contract(abiArtifact, address);
};

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const usePresaleNen = () => {
  return useContract(presaleNen, getPresaleNenAddress());
};

export const usePresaleNenPublic = () => {
  return useContractPublic(presaleNen, getPresaleNenAddress());
};

export const usePresaleNenVault = () => {
  return useContract(presaleNenVault, getPresaleNenVaultAddress());
};

export const useBUSDToken = () => {
  return useContract(busdToken, getBUSDAddress());
};

export const useNENToken = () => {
  return useContract(nenToken, getNenTokenAddress());
};

export default useContract;
