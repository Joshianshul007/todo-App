import { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import './TaskForm.css'; // Let's isolate styles if needed, or rely on index.css

const TaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const loading = useTaskStore((state) => state.loading);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Task title is required');
      return;
    }
    setErrorMsg('');
    await addTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form-card glass-panel">
      <h2>Create New Task</h2>
      {errorMsg && <div className="error-badge">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add any additional details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows="3"
          />
        </div>
        <button type="submit" className="primary-btn pulse-hover" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
