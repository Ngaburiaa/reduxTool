import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../app/store';
import { addTodo, toggleTodo, removeTodo, editTodo } from '../Features/todoSlice';


const Todo: React.FC = () => {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const remaining = todos.filter(todo => !todo.completed).length;

  const handleSubmit = () => {
    if (text.trim()) {
      if (editId !== null) {
        dispatch(editTodo({ id: editId, text }));
        setEditId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText('');
    }
  };

  const handleEdit = (id: number, currentText: string) => {
    setEditId(id);
    setText(currentText);
  };

  const cancelEdit = () => {
    setEditId(null);
    setText('');
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <div className="todo-remaining">
        <strong>Tasks remaining: {remaining}</strong>
      </div>

      <div className="todo-form">
        <input
          className="todo-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add or edit todo"
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button className="todo-button" onClick={handleSubmit}>
          {editId !== null ? 'Update' : 'Add'}
        </button>
        {editId !== null && (
          <button className="todo-button cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span
              className={todo.completed ? 'completed' : ''}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

