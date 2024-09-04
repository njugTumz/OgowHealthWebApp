// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://healthmanagementapi.azurewebsites.net/api'; // Replace with your API URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication function
export const authenticate = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/User/Login', credentials); // Assuming you meant /User/Login
  const { token, permissions } = response.data;

  // Store the token and permissions in localStorage (or sessionStorage)
  localStorage.setItem('authToken', token);
  localStorage.setItem('permissions', JSON.stringify(permissions));

  return response.data;
};


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
