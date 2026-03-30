import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useTaskStore from '../store/useTaskStore';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../App.css'; // Reuse our layout styles

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { clearTasks } = useTaskStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Nav guard
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    clearTasks(); // Clear local state so next user doesn't see old tasks briefly
    logout();
    navigate('/login');
  };

  if (!user) return null; // Prevent flash of dashboard

  return (
    <div className="app-container">
      <header className="app-header glass-panel" style={{ position: 'relative' }}>
        <button 
          onClick={handleLogout} 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '25px', 
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
          Logout
        </button>
        <h1>Task Master</h1>
        <p>Welcome back, {user.name}!</p>
      </header>

      <main className="main-content">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;
