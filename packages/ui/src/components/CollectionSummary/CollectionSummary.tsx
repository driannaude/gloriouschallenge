import {
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Box,
  Breadcrumbs,
  useTheme,
  Button,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import {
  INftCollectionSummary,
  INftCollectionSummaryRequest,
} from '@glorious-challenge/api-interface';
import { useNavigate } from 'react-router-dom';

interface CollectionSummaryProps {
  id: string | undefined;
}

export const CollectionSummaryComponent: React.FC<CollectionSummaryProps> = ({
  id,
}) => {
  // Hooks
  const { data, emit } = useWebSockets<INftCollectionSummary>('asset:update');
  const theme = useTheme();
  const navigate = useNavigate();
  // Lifecycle methods
  useEffect(() => {
    if (!id) return;
    emit<INftCollectionSummaryRequest>('asset:request', { id });
  }, [id]);

  if (!data) return null;

  const inspectOwner = (owner: string): void => {
    navigate(`/${owner}`);
  };

  return (
    <>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              #<span data-testid="collection-id">{data.collectionId}</span> -{' '}
              <span data-testid="collection-name">{data.name}</span>
            </Typography>
            <Button
              data-testid="collection-owner-link"
              onClick={() => inspectOwner(data.owner)}
            >
              <small>{data.owner}</small>
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box py={2}>
        <Divider />
      </Box>
      <Grid container spacing={5} rowSpacing={2}>
        {data.tokens.map((token) => {
          const key = token.path.join('-');
          const [collectionId, seriesId, serialNumber] = token.path;
          return (
            <Grid
              data-testid={`token-${token.path.join('-')}`}
              item
              md={6}
              sm={12}
              xs={12}
              key={token.path.join('-')}
            >
              <Card>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Breadcrumbs aria-label="breadcrumb">
                      <Typography variant="h5">{collectionId}</Typography>
                      <Typography variant="h5">{seriesId}</Typography>
                      <Typography
                        variant="h5"
                        color={theme.palette.primary.main}
                      >
                        {serialNumber}
                      </Typography>
                    </Breadcrumbs>
                    <Button
                      data-testid={`${token.path.join('-')}-link`}
                      onClick={() => inspectOwner(token.owner)}
                    >
                      <small>{token.owner}</small>
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export const CollectionSummary = React.memo(CollectionSummaryComponent);
