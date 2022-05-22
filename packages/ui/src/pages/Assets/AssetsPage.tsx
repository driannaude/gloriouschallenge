import React, { useState } from 'react';
import { CollectionSummary } from '../../components/CollectionSummary';
import { SearchBox } from '../../components/SearchBox';
import { Container, Grid, Card } from '@mui/material';

export const AssetsPageComponent = () => {
  const [collectionId, setCollectionId] = useState<string>();

  return (
    <Container>
      <Grid container component={Card} spacing={2} rowSpacing={2} padding={2}>
        <Grid item xs={12}>
          <SearchBox
            onSubmit={setCollectionId}
            placeholderText="Collection ID"
            buttonText="Search"
          />
        </Grid>
        <Grid item xs={12}>
          <CollectionSummary id={collectionId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export const AssetsPage = React.memo(AssetsPageComponent);
