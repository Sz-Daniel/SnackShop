import { useProducts } from '../../api/apiHooks';
import { Box, Grid } from '@mui/material';
import {
  ProductAdmin,
  PublicProductDisplay,
  UserProductDisplay,
} from './Product';
import { useEffect, useState } from 'react';
import { ProductDisplayType } from '../../type/type';
import { useSession } from '../../contexts/SessionContext';

export function ProductList() {
  const { session } = useSession();

  if (!session.authenticated) return <PublicProductList />;

  return session.isAdmin ? <AdminProductList /> : <UserProductList />;
}

/**
 * Shows the Product list and able To Put into Cart
 * Able to Modifies, Remove and Add Products
 * @returns Admin view of the product list
 */
export function AdminProductList() {
  const [productList, setProductList] = useState<ProductDisplayType[]>([]);
  const { data, error, setReload } = useProducts();
  const defaultProduct: ProductDisplayType = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
  };

  useEffect(() => {
    setProductList(data);
  }, [data]);

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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <ProductAdmin
              key={crypto.randomUUID()}
              product={defaultProduct}
              setReload={setReload}
            />

            {productList.map((prod) => (
              <ProductAdmin
                key={prod.id}
                product={prod}
                setReload={setReload}
              />
            ))}
          </Box>
          {error && <div>Error: {error}</div>}
        </Grid>
      </Grid>
    </>
  );
}
/**
 * Shows the Product list and able To Put into Cart
 * @returns User view of the product list
 */
export function UserProductList() {
  const { data, error } = useProducts();

  return (
    <Grid
      container
      spacing={2}
      direction={'row'}
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 6, md: 8 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {data.map((product) => (
            <UserProductDisplay key={product.id} product={product} />
          ))}
          {error && <div>Error: {error}</div>}
        </Box>
      </Grid>
    </Grid>
  );
}
/**
 * @returns Public view of the product list
 */
export function PublicProductList() {
  const { data, error } = useProducts();

  return (
    <Grid
      container
      spacing={2}
      direction={'row'}
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 6, md: 8 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {data.map((product) => (
            <PublicProductDisplay key={product.id} product={product} />
          ))}
          {error && <div>Error: {error}</div>}
        </Box>
      </Grid>
    </Grid>
  );
}
