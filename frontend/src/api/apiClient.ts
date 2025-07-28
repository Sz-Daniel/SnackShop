import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  config.headers['X-Request-ID'] = crypto.randomUUID();
  return config;
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

export default apiClient;

/**
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = '/server-down';
    }
    return Promise.reject(error);
  }
);


 */
