import { useProducts } from '../../api/apiHooks';
import { Box, Grid } from '@mui/material';
import {
  ProductAdminDisplay,
  PublicProductDisplay,
  UserProductDisplay,
} from './Product';
import { useEffect, useState } from 'react';
import { ProductDisplayType } from '../../type/type';
import { useSession } from '../../contexts/SessionContext';
import { useCart } from '../../contexts/CartContext';

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
        spacing={3}
        direction={'row'}
        justifyContent="center"
        alignItems="center"
      >
        <Grid size={{ xs: 12, md: 8, lg: 12 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: 2 }}>
            <ProductAdminDisplay
              key={crypto.randomUUID()}
              product={defaultProduct}
              setReload={setReload}
            />

            {productList.map((prod) => (
              <ProductAdminDisplay
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

export function UserProductList() {
  const [productList, setProductList] = useState<ProductDisplayType[]>([]);
  const { data, error } = useProducts();
  const { items: cartItems } = useCart();

  useEffect(() => {
    if (!data) return;

    const updatedProducts = data.map((product) => {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      const updatedStock = cartItem
        ? product.stock - cartItem.quantity
        : product.stock;
      return {
        ...product,
        stock: updatedStock,
      };
    });

    setProductList(updatedProducts);
  }, [data, cartItems]);

  return (
    <Grid container spacing={3} direction={'row'}>
      {productList
        .filter((p) => p.stock > 0)
        .map((product, idx) => (
          <Grid key={idx} size={{ xs: 12, lg: 4, md: 6, sm: 12, xl: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <UserProductDisplay key={product.id} product={product} />
            </Box>
          </Grid>
        ))}
      {error && <div>Error: {error}</div>}
    </Grid>
  );
}

export function PublicProductList() {
  const { data, error } = useProducts();

  return (
    <Grid container spacing={3} direction={'row'}>
      {data
        .filter((p) => p.stock > 0)
        .map((product, idx) => (
          <Grid key={idx} size={{ xs: 12, lg: 4, md: 6, sm: 12, xl: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <PublicProductDisplay key={product.id} product={product} />
            </Box>
          </Grid>
        ))}
      {error && <div>Error: {error}</div>}
    </Grid>
  );
}
