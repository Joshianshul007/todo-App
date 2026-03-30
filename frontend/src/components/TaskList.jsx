import { useEffect, useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskItem from './TaskItem';
import './TaskList.css';

const CATEGORIES = ['All', 'Work', 'Personal', 'Urgent', 'Other'];

const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading && tasks.length === 0) {
    return (
      <div className="tl-loader-wrap">
        <div className="tl-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-badge" style={{ margin: '1rem 0' }}>
        Failed to load tasks: {error}
      </div>
    );
  }

  const filteredTasks = filter === 'All' 
     ? tasks 
     : tasks.filter(t => t.category === filter);

  return (
    <div className="task-list-container">
      <div className="list-filters" style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter by Category:</span>
        <select 
           value={filter} 
           onChange={(e) => setFilter(e.target.value)} 
           className="form-select"
           style={{ width: '150px' }}
        >
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="tl-empty" style={{ padding: '2rem 1rem' }}>
          <span>📝</span>
          <p>No tasks found{filter !== 'All' ? ` for ${filter}` : ''}.</p>
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
