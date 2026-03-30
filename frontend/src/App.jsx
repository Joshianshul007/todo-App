import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>To-Do List</h1>
        <p>A simple way to manage your tasks</p>
      </header>
      
      <main className="app-main">
        <div className="card form-container">
          <TaskForm />
        </div>
        
        <div className="card list-container">
          <h2>Your Tasks</h2>
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;
