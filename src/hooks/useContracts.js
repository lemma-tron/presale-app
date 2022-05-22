import {
  getPresaleLemaAddress,
  getPresaleLemaVaultAddress,
  getBUSDAddress,
  getLemaTokenAddress,
} from "../libs/addressHelpers";
import { useWeb3, useWeb3Public } from "../libs/useWeb3";

import busdToken from "../config/abis/BEP20.json";
import lemaToken from "../config/abis/LemaToken.json";
import presaleLema from "../config/abis/PresaleLemaV2.json";
import presaleLemaVault from "../config/abis/PresaleLemaRefundVault.json";

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

export const usePresaleLema = () => {
  return useContract(presaleLema, getPresaleLemaAddress());
};

export const usePresaleLemaPublic = () => {
  return useContractPublic(presaleLema, getPresaleLemaAddress());
};

export const usePresaleLemaVault = () => {
  return useContract(presaleLemaVault, getPresaleLemaVaultAddress());
};

export const useBUSDToken = () => {
  return useContract(busdToken, getBUSDAddress());
};

export const useLemaToken = () => {
  return useContract(lemaToken, getLemaTokenAddress());
};

export default useContract;
