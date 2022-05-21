import React, { useCallback, useState } from 'react';
import { BalanceStatus } from '../../components/BalanceStatus';
import { BlockNumberStatus } from '../../components/BlockNumberStatus';
import { NonceStatus } from '../../components/NonceStatus';
import { SearchBox } from '../../components/SearchBox';

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
        <div className="col-12">
          <SearchBox
            onSubmit={onUpdateWalletAddress}
            buttonText="Search"
            placeholderText="Enter your CENNZNet Address..."
          />
        </div>
      </div>
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
    </div>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
