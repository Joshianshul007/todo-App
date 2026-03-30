import useTaskStore from '../store/useTaskStore';
import './TaskList.css';

const TaskItem = ({ task }) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(task.createdAt));

  return (
    <div className={`task-item-card glass-panel ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <h3 className={`task-title ${task.completed ? 'title-done' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`task-desc ${task.completed ? 'desc-done' : ''}`}>
            {task.description}
          </p>
        )}
      </div>
      
      <div className="task-meta">
        <span className="task-date">{formattedDate}</span>
        <button 
          className={`toggle-btn ${task.completed ? 'toggle-completed' : 'toggle-pending'}`}
          onClick={() => toggleTask(task._id)}
          aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.completed ? '✓ Completed' : '○ Pending'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
