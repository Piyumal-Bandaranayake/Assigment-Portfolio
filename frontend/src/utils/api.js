import axios from 'axios';

/**
 * Pre-configured Axios instance.
 * - Base URL uses Vite proxy (/api → http://localhost:5000/api)
 * - Request interceptor auto-attaches JWT from localStorage
 * - Response interceptor handles 401 (expired/invalid token)
 */
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto-clear auth on 401 (token expired or invalid)
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_token');
      localStorage.removeItem('portfolio_user');
      // Only redirect if not already on login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
