import React, { useEffect } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';

interface CollectionSummaryProps {
  id: string | undefined;
}

export const CollectionSummaryComponent: React.FC<CollectionSummaryProps> = ({
  id,
}) => {
  // Hooks
  const { data, emit } = useWebSockets<{
    collectionId: string;
    name: string;
    owner: string;
    tokens: { serialNumber: string; seriesId: string; owner: string }[];
  }>('asset:update');
  // Lifecycle methods
  useEffect(() => {
    if (!id) return;
    emit<{ id: string }>('asset:request', { id });
  }, [id]);

  if (!data) return null;

  return (
    <div>
      <h2>
        #{data.collectionId} - {data.name}
      </h2>
      <h5>Owned by: {data.owner}</h5>
      <ul>
        {data.tokens.map((token) => (
          <li key={token.serialNumber}>
            {token.serialNumber} - {token.owner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CollectionSummary = React.memo(CollectionSummaryComponent);
