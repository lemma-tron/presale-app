import addresses from "../config/constants/contracts";

const chainId = process.env.REACT_APP_CHAIN_ID;

export const getPresaleLemaAddress = () => {
  return addresses.presale[chainId];
};

export const getPresaleLemaVaultAddress = () => {
  return addresses.presaleVault[chainId];
};

export const getBUSDAddress = () => {
  return addresses.busd[chainId];
};

export const getLemaTokenAddress = () => {
  return addresses.lemaToken[chainId];
};
