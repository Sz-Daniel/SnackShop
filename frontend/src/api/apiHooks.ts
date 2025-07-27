import { useEffect, useState } from 'react';
import { Product } from '../type/type';
import apiClient from './apiClient';

/**
 * /api/products WITHOUT JSON
 * @returns  data error
 */
export function useGetAxios(url: string) {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    apiClient
      .get(url)
      .then((res) => setData(res.data.products))
      .catch(() => setError(true));
  }, [reload]);

  useEffect(() => {
    console.log({
      APIurl: url,
      data,
    });
  }, [data]);

  return { data, error, setReload };
}

export function useProducts() {
  return useGetAxios('/api/products');
}

export async function updateProduct(data: {
  id: number;
  name: string;
  price: number;
  stock: number;
}) {
  return apiClient.put(`/api/products/${data.id}`, data);
}
