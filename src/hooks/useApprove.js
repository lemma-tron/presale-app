import { useCallback } from "react";
import { approve } from "../libs/callHelpers";
import { usePresaleLemaVault } from "./useContracts";

// Approve BUSD
export const useApprove = (busdContract, account) => {
  const presaleLemaVaultContract = usePresaleLemaVault();
  const handleApprove = useCallback(
    async (amount) => {
      await approve(busdContract, presaleLemaVaultContract, account, amount);
    },
    [account, busdContract, presaleLemaVaultContract]
  );

  return { onApprove: handleApprove };
};
