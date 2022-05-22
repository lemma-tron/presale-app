import BigNumber from "bignumber.js";
import { ethers } from 'ethers';

export const approve = async (busdContract, presaleLemaVault, account) => {
  return busdContract.methods
    .approve(
      presaleLemaVault.options.address,
      ethers.constants.MaxUint256
    )
    .send({ from: account });
};

export const buyTokensWithBUSD = async (
  persaleLemaContract,
  amount,
  account
) => {
  return persaleLemaContract.methods
    .buyTokensWithBUSD((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
    .send({ from: account });
};

export const claimLemaToken = async (persaleLemaContract, account) => {
  return persaleLemaContract.methods.claimLemaToken().send({ from: account });
};

export const refundBUSD = async (persaleLemaContract, account) => {
  return persaleLemaContract.methods.claimRefund().send({ from: account });
};