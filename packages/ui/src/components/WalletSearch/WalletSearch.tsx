import React, { useState } from 'react';

import './WalletSearch.scss';

interface WalletSearchProps {
  onUpdate: (address: string) => void;
}

const WalletSearchComponent: React.FC<WalletSearchProps> = ({ onUpdate }) => {
  const [query, setQuery] = useState('');

  // Handlers
  const onUpdateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || '');
  };

  const onSubmit = () => {
    onUpdate(query);
  };

  return (
    <div className="wallet-search-card">
      <div className="row">
        <div className="col-12 search-inputs">
          <input
            className="search-box"
            onChange={onUpdateQuery}
            placeholder="Enter wallet address..."
            value={query}
          />

          <button className="search-btn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const WalletSearch = React.memo(WalletSearchComponent);
