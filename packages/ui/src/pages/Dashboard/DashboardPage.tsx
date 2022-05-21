import React from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';

const DashboardPageComponent = () => {
  const {
    isConnected,
    data: blockNumber,
    emit,
  } = useWebSockets<number>('update:block_number');

  return (
    <>
      <div>Block Number:</div>
      <div>{blockNumber}</div>
    </>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
