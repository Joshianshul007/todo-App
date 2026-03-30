import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Get user from localStorage safely
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getUserFromStorage(),
  loading: false,
  error: null,

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      localStorage.setItem('user', JSON.stringify(data.data));
      set({ user: data.data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', loading: false });
      return false;
    }
  },

  login: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/login`, userData);
      localStorage.setItem('user', JSON.stringify(data.data));
      set({ user: data.data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;
