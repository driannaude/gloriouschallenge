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
        {data.tokens.map((token) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Series ID: {token.seriesId}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Serial Number: {token.serialNumber}
                </Typography>
                <Typography variant="body2">
                  <small>Owner: {token.owner}</small>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const CollectionSummary = React.memo(CollectionSummaryComponent);
