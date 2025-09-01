// client/src/App.jsx
import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, deleteTask, updateTask } from './lib/api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [newTask, ...prev]);
    } catch (e) {
      setError(e.message);
    }
  };

  const toggle = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const updated = await updateTask(task._id, { status: nextStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const edit = async (task, title) => {
    try {
      const updated = await updateTask(task._id, { title: title });
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-dvh flex items-center bg-gray-100 justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-gray/4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Task Manager
        </h1>
        <p className="text-center text-gray-500 mb-6">
          manage your tasks
        </p>

        <TaskForm onAdd={add} />

        <div className="my-4 h-px bg-gray-200" />

        {error && (
          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading ...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggle} onEdit={edit} onDelete={remove} />
        )}
      </div>
    </div>
  );
}
