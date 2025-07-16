import React, { useState, useEffect } from 'react';
import { todoService } from './services/todoService';
import { Todo, CreateTodoRequest } from './types/Todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const newTodo: CreateTodoRequest = { title, description };
      await todoService.createTodo(newTodo);
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 10, padding: 10, border: '1px solid #ddd', borderRadius: 4 }}>
            <strong>{todo.title}</strong>
            {todo.description && <div>{todo.description}</div>}
            <div style={{ fontSize: 12, color: '#888' }}>Created: {new Date(todo.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App; 