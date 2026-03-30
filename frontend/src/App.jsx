import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>Task Master</h1>
        <p>Your optimized and beautiful task manager</p>
      </header>

      <main className="main-content">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
