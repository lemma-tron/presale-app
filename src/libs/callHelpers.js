import BigNumber from "bignumber.js";
import { ethers } from 'ethers';

export const approve = async (busdContract, presaleNenVault, account) => {
  return busdContract.methods
    .approve(
      presaleNenVault.options.address,
      ethers.constants.MaxUint256
    )
    .send({ from: account });
};

export const buyTokensWithBUSD = async (
  persaleNenContract,
  amount,
  account
) => {
  return persaleNenContract.methods
    .buyTokensWithBUSD((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
    .send({ from: account });
};

export const claimNENToken = async (persaleNenContract, account) => {
  return persaleNenContract.methods.claimNenToken().send({ from: account });
};

export const refundBUSD = async (persaleNenContract, account) => {
  return persaleNenContract.methods.claimRefund().send({ from: account });
};