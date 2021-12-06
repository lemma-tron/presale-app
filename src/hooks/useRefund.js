import { useCallback } from "react";
import { refundBUSD } from "../libs/callHelpers";

// Refund BUSD from PresaleVault
export const useRefund = (persaleNenContract, account) => {
  const handleRefund = useCallback(async () => {
    await refundBUSD(persaleNenContract, account);
  }, [account, persaleNenContract]);

  return { onRefund: handleRefund };
};