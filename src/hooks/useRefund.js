import { useCallback } from "react";
import { refundBUSD } from "../libs/callHelpers";

// Refund BUSD from PresaleVault
export const useRefund = (persaleLemaContract, account) => {
  const handleRefund = useCallback(async () => {
    await refundBUSD(persaleLemaContract, account);
  }, [account, persaleLemaContract]);

  return { onRefund: handleRefund };
};