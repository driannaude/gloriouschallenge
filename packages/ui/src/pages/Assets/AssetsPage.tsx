import React, { useState } from 'react';
import { SearchBox } from '../../components/SearchBox';

export const AssetsPageComponent = () => {
  const [collectionId, setCollectionId] = useState<string>();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SearchBox
            onSubmit={setCollectionId}
            placeholderText="Collection ID..."
            buttonText="Search"
          />
        </div>
      </div>
    </div>
  );
};

export const AssetsPage = React.memo(AssetsPageComponent);
