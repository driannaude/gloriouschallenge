import { web3Accounts, web3Enable } from '@cennznet/extension-dapp';
import { InjectedAccountWithMeta } from '@cennznet/extension-inject/types';
import { useEffect, useState } from 'react';

interface UseCennzExtensionHook {
  accounts: InjectedAccountWithMeta[];
  extensionInstalled: boolean;
  error: string | null;
  connectWallet: () => void;
}

export const useCennzExtension = (): UseCennzExtensionHook => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  const extensionSetup = async () => {
    const extensions = await web3Enable('glorious-challenge');
    if (extensions.length > 0) {
      setExtensionInstalled(true);
    }
    const extensionAccounts = await web3Accounts();
    setAccounts(extensionAccounts);
  };

  const connectWallet = () => {
    extensionSetup();
  };

  return {
    accounts,
    error,
    extensionInstalled,
    connectWallet,
  };
};
