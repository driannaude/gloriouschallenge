import React, { useCallback, useState } from 'react';
import { BalanceStatus } from '../../components/BalanceStatus';
import { BlockNumberStatus } from '../../components/BlockNumberStatus';
import { NonceStatus } from '../../components/NonceStatus';
import { SearchBox } from '../../components/SearchBox';
import { Grid, Card, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const DashboardPageComponent = () => {
  // Hooks
  const params = useParams<{ address: string }>();
  // State
  const [address, setAddress] = useState<string | null>(params.address ?? null);

  // Handlers
  const onUpdateWalletAddress = useCallback(
    (newAddress: string) => {
      setAddress(newAddress);
    },
    [setAddress]
  );

  return (
    <Container>
      <Grid container component={Card} spacing={2} rowSpacing={2} padding={2}>
        <Grid item xs={12}>
          <SearchBox
            onSubmit={onUpdateWalletAddress}
            initialValue={address}
            buttonText="Search"
            placeholderText="CENNZNet Address"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <BalanceStatus address={address} />
        </Grid>
        <Grid item md={4} xs={12}>
          <NonceStatus address={address} />
        </Grid>
        <Grid item md={4} xs={12}>
          <BlockNumberStatus />
        </Grid>
      </Grid>
    </Container>
  );
};

export const DashboardPage = React.memo(DashboardPageComponent);
