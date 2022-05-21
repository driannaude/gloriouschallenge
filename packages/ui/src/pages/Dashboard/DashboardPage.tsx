import React from 'react';
import { BlockNumberStatus } from '../../components/BlockNumberStatus';

const DashboardPageComponent = () => {
  return (
    <div className="row">
      <div className="col-8"></div>
      <div className="col-4">
        <BlockNumberStatus />
      </div>
    </div>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
