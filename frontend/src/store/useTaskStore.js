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
      set((state) => ({ 
        tasks: [data.data, ...state.tasks],
        loading: false 
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  completeTask: async (taskId) => {
    set({ error: null });
    try {
      const { data } = await axios.put(`${API_URL}/${taskId}`, { completed: true });
      set((state) => ({
        tasks: state.tasks.map((t) => t._id === taskId ? data.data : t)
      }));
    } catch (error) {
       // Display meaningful error
       const msg = error.response?.data?.message || "Failed to mark as completed";
       alert(msg);
       set({ error: msg });
    }
  },

  editTask: async (taskId, taskData) => {
    set({ error: null });
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === taskId ? { ...t, ...taskData } : t
      )
    }));
    try {
      const { data } = await axios.put(`${API_URL}/${taskId}`, taskData);
      set((state) => ({
        tasks: state.tasks.map((t) => t._id === taskId ? data.data : t)
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      // Re-fetch to revert optimistic update on failure
      const storeState = useTaskStore.getState();
      await storeState.fetchTasks();
    }
  },

  deleteTask: async (taskId) => {
    set({ error: null });
    // Optimistic removal
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== taskId) }));
    try {
      await axios.delete(`${API_URL}/${taskId}`);
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      // Re-fetch to revert on failure
      const storeState = useTaskStore.getState();
      await storeState.fetchTasks();
    }
  },

  clearTasks: () => set({ tasks: [] })
}));

export default useTaskStore;
