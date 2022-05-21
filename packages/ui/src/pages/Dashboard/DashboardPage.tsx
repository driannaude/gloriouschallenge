import React from 'react';
import { BlockNumberStatus } from '../../components/BlockNumberStatus';
import { WalletInfo } from '../../components/WalletInfo';

const DashboardPageComponent = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">
          <BlockNumberStatus />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <WalletInfo />
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
