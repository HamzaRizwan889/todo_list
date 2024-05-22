import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
    console.log(savedTodos, "Saved Todo")
    setNextId(savedTodos.length ? savedTodos[savedTodos.length - 1].id + 1 : 1);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([...todos, { id: nextId, text: input }]);
    setNextId(nextId + 1);
    setInput('');
  };

  const editTodo = (e) => {
    e.preventDefault();
    setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: editInput } : todo));
    setEditId(null);
    setEditInput('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {editId === todo.id ? (
                  <form onSubmit={editTodo}>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      placeholder="Edit todo"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                  </form>
                ) : (
                  todo.text
                )}
              </td>
              <td>
                <button onClick={() => {
                  setEditId(todo.id);
                  setEditInput(todo.text);
                }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
