
import axios from 'axios';
import { AuthResponse, User, Post, Interaction } from '../types';
import { storage } from '../utils/storage';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = storage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => api.post('/users/auth/register/', data),
  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/users/auth/login/', data);
    if (response.data.access) {
      storage.setItem('accessToken', response.data.access);
      storage.setItem('refreshToken', response.data.refresh);
    }
    return response.data;
  },
  me: async (): Promise<User> => {
    const response = await api.get('/users/auth/me/');
    return response.data;
  },
  logout: () => {
    storage.removeItem('accessToken');
    storage.removeItem('refreshToken');
  }
};

export const posts = {
  list: async (): Promise<Post[]> => {
    const response = await api.get('/api/posts/');
    return response.data;
  },
  create: async (formData: FormData): Promise<Post> => {
    const response = await api.post('/api/posts/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  update: async (id: number, data: FormData): Promise<Post> => {
    const response = await api.patch(`/api/posts/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  interact: async (data: Interaction) => {
    const response = await api.post('/api/interactions/', data);
    return response.data;
  },
  leaderboard: async (): Promise<Post[]> => {
    const response = await api.get('/users/leaderboard/');
    return response.data;
  },
};

export const users = {
  get: async (username: string): Promise<User> => {
    const response = await api.get(`/users/${username}/`);
    return response.data;
  },
  update: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch(`/users/~update/`, data);
    return response.data;
  },
};
