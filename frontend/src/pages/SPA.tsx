import { Grid, Paper } from '@mui/material';
import { ProductList } from './ProductList';

export function SPA() {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction={'row'}
        justifyContent="center"
        alignItems="center"
      >
        <Grid size={{ xs: 6, md: 8 }}>
          <ProductList />
        </Grid>
      </Grid>
    </>
  );
}
