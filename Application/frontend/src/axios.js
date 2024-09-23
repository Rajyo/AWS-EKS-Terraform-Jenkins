import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': `${import.meta.env.VITE_SERVER_URL}`,
    // 'Access-Control-Allow-Credentials': 'true'
  },
  // withCredentials: true
});


export default axiosInstance;

