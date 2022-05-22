import { useCallback } from "react";
import { buyTokensWithBUSD } from "../libs/callHelpers";

// Deposit BUSD in PresaleVault
export const useDeposit = (persaleLemaContract, account) => {
  const handleDeposit = useCallback(
    async (amount) => {
      await buyTokensWithBUSD(persaleLemaContract, amount, account);
    },
    [account, persaleLemaContract]
  );

  return { onDeposit: handleDeposit };
};
