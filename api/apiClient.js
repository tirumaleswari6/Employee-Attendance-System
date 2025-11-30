import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
  headers: { 'Content-Type': 'application/json' },
});

// Add token automatically if exists
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
