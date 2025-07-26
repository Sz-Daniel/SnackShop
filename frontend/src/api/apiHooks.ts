import { useEffect, useState } from 'react';
import { Product } from '../type/type';
import axios from 'axios';
/**
 * /api/products WITHOUT JSON
 * @returns  data error
 */
export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then((res) => setData(res.data.products))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    console.log({
      Component: 'useProducts',
      API: 'http://localhost:3000/api/products',
      data,
    });
  }, [data]);

  return { data, error };
}
