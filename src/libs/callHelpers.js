import BigNumber from "bignumber.js";
import scientificToDecimal from "scientific-to-decimal";

export const approve = async (
  busdContract,
  presaleLemaVault,
  account,
  amount
) => {
  const value = scientificToDecimal(
    new BigNumber(amount).times(new BigNumber(10).pow(18))
  );
  return busdContract.methods
    .approve(presaleLemaVault.options.address, value)
    .send({ from: account });
};

export const buyTokensWithBUSD = async (
  persaleLemaContract,
  amount,
  account
) => {
  const value = scientificToDecimal(
    new BigNumber(amount).times(new BigNumber(10).pow(18))
  );
  return persaleLemaContract.methods
    .buyTokensWithBUSD(value)
    .send({ from: account });
};

export const claimLemaToken = async (persaleLemaContract, account) => {
  return persaleLemaContract.methods.claimLemaToken().send({ from: account });
};

export const refundBUSD = async (persaleLemaContract, account) => {
  return persaleLemaContract.methods.claimRefund().send({ from: account });
};
