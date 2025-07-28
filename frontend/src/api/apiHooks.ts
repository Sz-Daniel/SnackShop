import { useEffect, useState } from 'react';
import { Product } from '../type/type';
import apiClient from './apiClient';

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    apiClient
      .get('/api/products')
      .then((res) => setData(res.data.products))
      .catch(() => setError(true));
  }, [reload]);

  useEffect(() => {
    console.log({
      APIurl: '/api/products',
      data,
    });
  }, [data]);

  return { data, error, setReload };
}

export async function deleteProduct(id: number) {
  try {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Törlés sikertelen: ${message}`);
  }
}

export async function updateProduct(data: {
  id: number;
  name: string;
  price: number;
  stock: number;
}) {
  try {
    const response = await apiClient.put(`/api/products/${data.id}`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Módosítás sikertelen: ${message}`);
  }
}

export async function uploadProduct(data: {
  name: string;
  price: number;
  stock: number;
}) {
  try {
    const response = await apiClient.post(`/api/products`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Feltöltés sikertelen: ${message}`);
  }
}
