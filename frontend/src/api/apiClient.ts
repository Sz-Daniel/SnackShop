import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export async function apiDeleteProduct(id: number) {
  try {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Törlés sikertelen:', error);
    throw error;
  }
}

export default apiClient;

/**
 * apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = '/server-down';
    }
    return Promise.reject(error);
  }
);
 */
