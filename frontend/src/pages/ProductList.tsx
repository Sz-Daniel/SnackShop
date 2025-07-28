import { useProducts } from '../api/apiHooks';
import { Box } from '@mui/material';
import { ProductAdmin } from './Product';
import { useEffect, useState } from 'react';
import { Product } from '../type/type';

export function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const { data, error, setReload } = useProducts();
  const defaultProduct: Product = { id: 0, name: '', price: 0, stock: 0 };

  useEffect(() => {
    setProductList(data);
  }, [data]);

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <ProductAdmin
          key={crypto.randomUUID()}
          product={defaultProduct}
          setReload={setReload}
        />
        {productList.map((prod) => (
          <ProductAdmin key={prod.id} product={prod} setReload={setReload} />
        ))}
      </Box>
      {error && <div>Error: {error}</div>}
    </>
  );
}
