import { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import './TaskForm.css';

const CATEGORIES = ['Other', 'Work', 'Personal', 'Urgent'];

const TaskForm = ({ onAdded }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const loading = useTaskStore((state) => state.loading);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [dueDate, setDueDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Task title is required');
      return;
    }
    setErrorMsg('');
    await addTask({ title, description, category, dueDate: dueDate || null });
    setTitle('');
    setDescription('');
    setCategory('Other');
    setDueDate('');
    if (onAdded) onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-inline">
      {errorMsg && <div className="error-badge" style={{ marginBottom: '0.75rem' }}>{errorMsg}</div>}
      <div className="task-form-row">
        <div className="input-group" style={{ flex: 1.5 }}>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-group" style={{ flex: 2 }}>
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      <div className="task-form-row" style={{ marginTop: '0.75rem' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="form-select"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
            className="form-date"
          />
        </div>
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? '...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
