import React from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';

export const HomePage: React.FC = () => {
  const {
    isConnected,
    data: blockNumber,
    emit,
  } = useWebSockets<number>('update:block_number', {
    onConnect: () => console.log('connected'),
  });

  return (
    <>
      <div>Block Number:</div>
      <div>{blockNumber}</div>
    </>
  );
};
