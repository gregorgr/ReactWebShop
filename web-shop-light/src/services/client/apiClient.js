import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Ustvari Axios instanco
const apiClient = axios.create({
  baseURL: API_BASE_URL, //'http://localhost:5020/api',
});

// Dodaj interceptor za zahteve
apiClient.interceptors.request.use(
  (config) => {
    // Dodaj Bearer token iz sessionStorage (ali AuthContext)
    const token = sessionStorage.getItem('token'); // Ali pridobite token iz AuthContext
    console.log("apiClient.interceptors.request:token: ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
