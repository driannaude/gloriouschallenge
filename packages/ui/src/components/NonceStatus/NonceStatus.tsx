import React, { useMemo } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

import './NonceStatus.scss';

interface NonceStatusProps {
  address: string | null;
}

const NonceStatusComponent: React.FC<NonceStatusProps> = ({ address }) => {
  const { data, emit } = useWebSockets<{ nonce: number }>('nonce:update');

  const nonce = useMemo(() => {
    if (!address) return '-';
    return data?.nonce ?? 'Loading';
  }, [address, data]);

  return (
    <div className="block-number-status">
      <h1>{nonce}</h1>
      <h5>
        <FontAwesomeIcon icon={faHistory} />
        Nonce
      </h5>
    </div>
  );
};

export const NonceStatus = React.memo(NonceStatusComponent);
