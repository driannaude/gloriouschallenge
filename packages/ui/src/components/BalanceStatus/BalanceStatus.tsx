import React, { useEffect, useMemo } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import './BalanceStatus.scss';
import {
  IWalletAccount,
  IWalletRequest,
} from '@glorious-challenge/api-interface';

interface BalanceStatusProps {
  address: string | null;
}

const BalanceStatusComponent: React.FC<BalanceStatusProps> = ({ address }) => {
  // Hooks
  const { data, emit } = useWebSockets<IWalletAccount>('wallet:update');

  // Memoized values
  const balance = useMemo(() => {
    if (!address) return '-';
    return data?.balance ?? 'Loading';
  }, [address, data]);

  useEffect(() => {
    if (!address) return;
    // NOTE: UseEffect will be called twice in dev because we have strict mode on
    // This may result in additional subscriptions, but this is a red herring that only happens in dev
    emit<IWalletRequest>('wallet:request', {
      address,
    });
  }, [address]);

  return (
    <div className="block-number-status">
      <h1>{balance}</h1>
      <h5>
        <FontAwesomeIcon icon={faDollarSign} />
        CENNZ Balance
      </h5>
    </div>
  );
};

export const BalanceStatus = BalanceStatusComponent;
