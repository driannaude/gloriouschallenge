import React from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';

import './BlockNumberStatus.scss';

const BlockNumberStatusComponent = () => {
  const { data: blockNumber, emit } = useWebSockets<number>(
    'block_number:update'
  );

  return (
    <div className="block-number-status">
      <h1>{blockNumber ?? 'Loading...'}</h1>
      <h5>
        <FontAwesomeIcon icon={faWaveSquare} />
        Current Block Number
      </h5>
    </div>
  );
};

export const BlockNumberStatus = React.memo(BlockNumberStatusComponent);
