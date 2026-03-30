import './TaskList.css';

const TaskItem = ({ task }) => {
  // Format date correctly
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(task.createdAt));

  return (
    <div className="task-item-card glass-panel">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
      </div>
      
      <div className="task-meta">
        <span className="task-date">{formattedDate}</span>
        <span className={task.completed ? 'status-badge status-completed' : 'status-badge status-pending'}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
