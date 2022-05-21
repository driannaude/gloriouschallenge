import React, { useState } from 'react';

import './SearchBox.scss';

interface SearchBoxProps {
  placeholderText: string;
  buttonText: string;
  onSubmit: (address: string) => void;
}

const SearchBoxComponent: React.FC<SearchBoxProps> = ({
  buttonText,
  placeholderText,
  onSubmit,
}) => {
  // State
  const [query, setQuery] = useState('');

  // Handlers
  const onUpdateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || '');
  };

  const onSubmitSearch = () => {
    onSubmit(query);
  };

  return (
    <div className="search-box">
      <div className="row">
        <div className="col-12 inputs">
          <input
            onChange={onUpdateQuery}
            placeholder={placeholderText}
            value={query}
          />

          <button className="search-btn" onClick={onSubmitSearch}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const SearchBox = React.memo(SearchBoxComponent);
