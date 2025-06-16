import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  clearCompleted,
  type Priority
} from '../Features/todoSlice';
import type { RootState, AppDispatch } from '../app/store';
import { toast } from 'react-toastify';

const Todo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, filter } = useSelector((state: RootState) => state.todo);

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!text || !dueDate || !priority) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editId !== null) {
      dispatch(editTodo({ id: editId, text, dueDate, priority }));
      toast.success('Todo updated!');
      setEditId(null);
    } else {
      dispatch(addTodo({ text, dueDate, priority }));
      toast.success('Todo added!');
    }

    setText('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleEdit = (todo: any) => {
    setEditId(todo.id);
    setText(todo.text);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
  });

  const remaining = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <p><strong>Tasks remaining:</strong> {remaining}</p>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Todo text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</button>
        {editId !== null && <button onClick={() => setEditId(null)}>Cancel</button>}
      </div>

      <div className="todo-filters">
        <button onClick={() => dispatch(setFilter('All'))} className={filter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => dispatch(setFilter('Active'))} className={filter === 'Active' ? 'active' : ''}>Active</button>
        <button onClick={() => dispatch(setFilter('Completed'))} className={filter === 'Completed' ? 'active' : ''}>Completed</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div onClick={() => dispatch(toggleTodo(todo.id))} style={{ cursor: 'pointer' }}>
              <strong>{todo.text}</strong> <br />
              <small>Due: {todo.dueDate} | Priority: {todo.priority}</small>
            </div>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => {
              dispatch(removeTodo(todo.id));
              toast.info('Todo removed');
            }}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => {
        dispatch(clearCompleted());
        toast.success('Completed tasks cleared!');
      }}>Clear Completed</button>
    </div>
  );
};

export default Todo;


