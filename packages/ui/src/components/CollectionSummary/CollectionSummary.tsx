import {
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Box,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  INftCollectionSummary,
  INftCollectionSummaryRequest,
} from '@glorious-challenge/api-interface';

interface CollectionSummaryProps {
  id: string | undefined;
}

export const CollectionSummaryComponent: React.FC<CollectionSummaryProps> = ({
  id,
}) => {
  // Hooks
  const { data, emit } = useWebSockets<INftCollectionSummary>('asset:update');
  // Lifecycle methods
  useEffect(() => {
    if (!id) return;
    emit<INftCollectionSummaryRequest>('asset:request', { id });
  }, [id]);

  if (!data) return null;
  console.log(data);

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
            <Grid item md={4} sm={6} xs={12} key={token.path.join('-')}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Series ID: {seriesId}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Serial Number: {serialNumber}
                  </Typography>
                  <Typography variant="body2">
                    <small>Owner: {token.owner}</small>
                  </Typography>
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
