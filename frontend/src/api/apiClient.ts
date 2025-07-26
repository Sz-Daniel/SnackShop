import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

async function testBackend() {
  try {
    const response = await apiClient.get('/api/health');
    console.log('Backend válasz:', response.data);
  } catch (error) {
    console.error('Hiba a backend tesztelésekor:', error);
  }
}

testBackend();
export default apiClient;
