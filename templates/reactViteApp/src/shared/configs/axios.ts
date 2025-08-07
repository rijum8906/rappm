import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env || '';

const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default axiosInstance;