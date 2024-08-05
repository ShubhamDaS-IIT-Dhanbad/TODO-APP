import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    // Fetch todos from localStorage
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">TODO-LIST</h1>
        <div className="addTodo">
          <div className="input-container">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <div className="checkbox-container">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label htmlFor="show" id='show-finished'>FINISHED TASK</label>
        </div>
        <div className="divider"></div>
        <h2 style={{color:"white"}}>TODO'S</h2>
        <div className="todos" style={{color:"white"}}>
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos
            .filter((item) => showFinished || !item.isCompleted)
            .map((item) => (
              <div key={item.id} className={`todo ${item.isCompleted ? 'completed' : 'pending'}`}>
                <div className="todo-content">
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => handleEdit(item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
