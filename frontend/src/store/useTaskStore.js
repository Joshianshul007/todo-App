import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(API_URL);
      set({ tasks: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(API_URL, taskData);
      // Optimistically push to the top of the array since it's newest-first
      set((state) => ({ 
        tasks: [data.data, ...state.tasks],
        loading: false 
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  }
}));

export default useTaskStore;
