import { useCallback } from "react";
import { approve } from "../libs/callHelpers";
import { usePresaleLemaVault } from "./useContracts";

// Approve BUSD
export const useApprove = (busdContract, account) => {
  const presaleLemaVaultContract = usePresaleLemaVault();
  const handleApprove = useCallback(async () => {
    await approve(busdContract, presaleLemaVaultContract, account);
  }, [account, busdContract, presaleLemaVaultContract]);

  return { onApprove: handleApprove };
};
