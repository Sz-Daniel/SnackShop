import { useProducts } from '../api/apiHooks';
import { Box } from '@mui/material';
import { ProductModif } from './Product';
import { useEffect, useState } from 'react';
import { Product } from '../type/type';

export function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const { data, error, setReload } = useProducts();

  useEffect(() => {
    setProductList(data);
  }, [data]);

  return (
    <>
      {productList.map((prod) => (
        <Box key={prod.id} border={1} padding={2} margin={1}>
          <ProductModif product={prod} setReload={setReload} />
        </Box>
      ))}
    </>
  );
}
