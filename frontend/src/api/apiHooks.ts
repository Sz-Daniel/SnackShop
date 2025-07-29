import { useEffect, useState } from 'react';
import { ProductDisplayType } from '../type/type';
import apiClient from './apiClient';
import { LogItem } from '../pages/Admin/Logs';
import { useSession } from '../contexts/SessionContext';

export function useProducts() {
  const [data, setData] = useState<ProductDisplayType[]>([]);
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

export async function registerUser(data: { name: string; password: string }) {
  try {
    const response = await apiClient.post('/api/register', data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Regisztráció sikertelen: ${message}`);
  }
}

export async function loginUser(data: { name: string; password: string }) {
  try {
    const response = await apiClient.post('/api/login', data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Bejelentkezés sikertelen: ${message}`);
  }
}

export async function getLogs() {
  try {
    const response = await apiClient.get('/api/log');
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Ismeretlen hiba';
    throw new Error(`Logok lekérése sikertelen: ${message}`);
  }
}
export function useLogs() {
  const [data, setData] = useState<LogItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiClient
      .get('/api/log')
      .then((res) => setData(res.data.response))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    console.log({
      APIurl: '/api/log',
      data,
    });
  }, [data]);

  return { data, error };
}
export type OrderItem = {
  order_id: number;
  order_date: string; // ISO dátumként jön, ezt stringként kezeljük
  user_name: string;
  product_name: string;
  quantity: number;
  price: number;
  item_total: number;
};

export function useOrders() {
  const [data, setData] = useState<OrderItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiClient
      .get('/api/orders')
      .then((res) => setData(res.data))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    console.log({
      APIurl: '/api/orders',
      data,
    });
  }, [data]);

  return { data, error };
}

export function useLogout() {
  const { setSession } = useSession();

  const logout = async () => {
    try {
      await apiClient.post('/api/logout'); // nincs body
      setSession({
        authenticated: false,
        isAdmin: false,
        userId: undefined,
        userName: undefined,
      });
      localStorage.removeItem('session');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
}

/**
 * export function useProductQuantity(id: number) {
  const [data, setData] = useState<ProductDisplayType[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiClient
      .get('/api/products')
      .then((res) => setData(res.data.products.stock))
      .then((data) => console.log(data))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    console.log({
      APIurl: '/api/products',
      data,
    });
  }, [data]);

  return { data, error };
}
 */
