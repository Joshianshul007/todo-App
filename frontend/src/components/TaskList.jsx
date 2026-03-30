import { useEffect } from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading && tasks.length === 0) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-badge" style={{ marginTop: '2rem' }}>
        Failed to fetch tasks: {error}
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span className="task-count-badge">{tasks.length} total</span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          You don't have any tasks yet. Add one above!
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
