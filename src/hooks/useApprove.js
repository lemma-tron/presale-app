import { useCallback } from 'react';
import { approve } from '../libs/callHelpers';
import { usePresaleNenVault } from "./useContracts";

// Approve BUSD
export const useApprove = (busdContract, account) => {
  const presaleNenVaultContract = usePresaleNenVault();
  const handleApprove = useCallback(async () => {
    await approve(busdContract, presaleNenVaultContract, account);
  }, [account, busdContract, presaleNenVaultContract]);

  return { onApprove: handleApprove };
};
