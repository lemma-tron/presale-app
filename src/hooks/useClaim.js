import { useCallback } from "react";
import { claimLemaToken } from "../libs/callHelpers";

// Deposit BUSD in PresaleVault
export const useClaim = (persaleLemaContract, account) => {
  const handleClaim = useCallback(
    async () => {
      await claimLemaToken(persaleLemaContract, account);
    },
    [account, persaleLemaContract]
  );

  return { onClaim: handleClaim };
};
