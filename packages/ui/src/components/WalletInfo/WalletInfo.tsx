import React, { useState } from 'react';

import './WalletInfo.scss';

const WalletInfoComponent = () => {
  const [query, setQuery] = useState('');

  // Handlers
  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || '');
  };
  return (
    <div className="wallet-info-card">
      <div className="row">
        <div className="col-12">
          <input
            className="search-box"
            onChange={updateQuery}
            placeholder="Enter wallet address..."
            value={query}
          />
        </div>
      </div>
    </div>
  );
};

export const WalletInfo = React.memo(WalletInfoComponent);
