import { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import './TaskList.css';

const CATEGORIES = ['Other', 'Work', 'Personal', 'Urgent'];

const TaskItem = ({ task }) => {
  const { completeTask, editTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing]   = useState(false);
  const [editTitle, setEditTitle]   = useState(task.title);
  const [editDesc, setEditDesc]     = useState(task.description || '');
  const [editCategory, setEditCategory] = useState(task.category || 'Other');
  
  // Format due date for date input "YYYY-MM-DD"
  const getISODate = (d) => d ? new Date(d).toISOString().split('T')[0] : '';
  const [editDueDate, setEditDueDate] = useState(getISODate(task.dueDate));
  const [editError, setEditError]   = useState('');

  const formattedCreated = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date(task.createdAt));

  let formattedDue = '';
  let isOverdue = false;
  if (task.dueDate && !task.completed) {
    const dueObj = new Date(task.dueDate);
    formattedDue = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(dueObj);
    isOverdue = dueObj < new Date(new Date().setHours(0,0,0,0));
  } else if (task.dueDate) {
    formattedDue = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(task.dueDate));
  }

  const handleSave = async () => {
    if (!editTitle.trim()) { setEditError('Title is required'); return; }
    setEditError('');
    await editTask(task._id, { 
       title: editTitle.trim(), 
       description: editDesc.trim(),
       category: editCategory,
       dueDate: editDueDate || null
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditCategory(task.category || 'Other');
    setEditDueDate(getISODate(task.dueDate));
    setEditError('');
    setIsEditing(false);
  };

  const handleToggle = (e) => { 
      e.stopPropagation(); 
      if (!task.completed) completeTask(task._id); 
  };
  
  const handleEditClick = (e) => { e.stopPropagation(); setIsEditing(true); };
  
  const handleDeleteClick = (e) => {
      e.stopPropagation();
      deleteTask(task._id);
  }

  // Determine badge colors for category
  const badgeClassMap = {
      'Work': 'badge-work',
      'Personal': 'badge-personal',
      'Urgent': 'badge-urgent',
      'Other': 'badge-other'
  };

  if (isEditing) {
    return (
      <li className="task-row task-row-editing">
        <div className="task-edit-inline">
          {editError && <span className="edit-inline-error">{editError}</span>}
          <div className="task-edit-fields">
            <input className="edit-input" type="text" value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} autoFocus placeholder="Task title" />
            <input className="edit-input" type="text" value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)} placeholder="Description (optional)" />
            <select className="edit-input" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className="edit-input" type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
          </div>
          <div className="task-edit-actions" style={{marginTop: '0.5rem'}}>
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-row ${task.completed ? 'task-row-done' : ''}`}>
      <button
        className={`task-check ${task.completed ? 'task-check-completed' : 'task-check-pending'}`}
        onClick={handleToggle}
        disabled={task.completed}
        title={task.completed ? "Already completed" : "Mark as complete"}
        aria-label="Mark completed"
      >
        {task.completed ? <span>✓</span> : <span></span>}
      </button>

      <div className="task-row-content">
        <div className="task-row-header" style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.2rem'}}>
            <p className={`task-row-title ${task.completed ? 'task-row-title-done' : ''}`} style={{marginBottom: 0}}>
            {task.title}
            </p>
            {task.category && task.category !== 'Other' && (
               <span className={`cat-badge ${badgeClassMap[task.category] || 'badge-other'}`}>{task.category}</span>
            )}
        </div>
        {task.description && (
          <p className="task-row-desc">{task.description}</p>
        )}
        <div className="task-row-meta" style={{marginTop: '0.25rem'}}>
          <span className="meta-date">Created: {formattedCreated}</span>
          {task.dueDate && (
             <>
               <span className="meta-sep">·</span>
               <span className={`meta-date ${isOverdue ? 'overdue-text' : ''}`}>Due: {formattedDue}</span>
             </>
          )}
          {task.completed && <span className="meta-sep" style={{marginLeft: '8px', color: '#16a34a'}}>✓ Completed</span>}
        </div>
      </div>
      
      <div className="task-row-actions">
        <button className="task-text-btn task-edit-text-btn" onClick={handleEditClick} title="Edit" aria-label="Edit">Edit</button>
        <button className="task-text-btn task-delete-text-btn" onClick={handleDeleteClick} title="Delete" aria-label="Delete">Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
