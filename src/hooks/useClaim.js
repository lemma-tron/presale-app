import { useCallback } from "react";
import { claimNENToken } from "../libs/callHelpers";

// Deposit BUSD in PresaleVault
export const useClaim = (persaleNenContract, account) => {
  const handleClaim = useCallback(
    async () => {
      await claimNENToken(persaleNenContract, account);
    },
    [account, persaleNenContract]
  );

  return { onClaim: handleClaim };
};
