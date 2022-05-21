import React, { useCallback, useState } from 'react';
import { BalanceStatus } from '../../components/BalanceStatus';
import { BlockNumberStatus } from '../../components/BlockNumberStatus';
import { NonceStatus } from '../../components/NonceStatus';
import { WalletSearch } from '../../components/WalletSearch';

const DashboardPageComponent = () => {
  // State
  const [address, setAddress] = useState<string | null>(null);

  // Handlers
  const onUpdateWalletAddress = useCallback(
    (newAddress: string) => {
      setAddress(newAddress);
    },
    [setAddress]
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <BalanceStatus address={address} />
        </div>
        <div className="col-4">
          <NonceStatus address={address} />
        </div>
        <div className="col-4">
          <BlockNumberStatus />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <WalletSearch onUpdate={onUpdateWalletAddress} />
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
