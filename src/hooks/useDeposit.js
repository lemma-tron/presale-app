import { useCallback } from "react";
import { buyTokensWithBUSD } from "../libs/callHelpers";

// Deposit BUSD in PresaleVault
export const useDeposit = (persaleNenContract, account) => {
  const handleDeposit = useCallback(
    async (amount) => {
      await buyTokensWithBUSD(persaleNenContract, amount, account);
    },
    [account, persaleNenContract]
  );

  return { onDeposit: handleDeposit };
};
