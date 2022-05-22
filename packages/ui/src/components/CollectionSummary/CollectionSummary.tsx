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
          <Stack direction="column">
            <Typography variant="subtitle1" fontWeight="bold">
              #{data.collectionId} - {data.name}
            </Typography>
            <Typography variant="caption">Owned by: {data.owner}</Typography>
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
            <Grid item md={6} sm={12} xs={12} key={token.path.join('-')}>
              <Card>
                <CardContent>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Typography variant="h5">{collectionId}</Typography>
                    <Typography variant="h5">{seriesId}</Typography>
                    <Typography variant="h5" color={theme.palette.primary.main}>
                      {serialNumber}
                    </Typography>
                  </Breadcrumbs>
                  <Stack direction="column">
                    <Typography variant="subtitle2">Owned by</Typography>
                    <Button onClick={() => inspectOwner(token.owner)}>
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
