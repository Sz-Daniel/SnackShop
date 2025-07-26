import { useState, useEffect } from 'react';
import axios from './apiClient';

export function useHealthCheck() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('/api/health')
      .then((res) => setStatus(res.data.status))
      .catch(() => setError(true));
  }, []);

  return { status, error };
}
