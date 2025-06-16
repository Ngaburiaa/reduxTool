
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Priority = 'Low' | 'Medium' | 'High';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: Priority;
}

interface TodoState {
  todos: Todo[];
  filter: 'All' | 'Active' | 'Completed';
}

const initialState: TodoState = {
  todos: [
    { id: 1, text: 'Workout', completed: false, dueDate: '2025-06-17', priority: 'High' },
    { id: 2, text: 'Read a book', completed: false, dueDate: '2025-06-18', priority: 'Low' },
    { id: 3, text: 'Finish React project', completed: false, dueDate: '2025-06-20', priority: 'High' },
    { id: 4, text: 'Buy groceries', completed: false, dueDate: '2025-06-16', priority: 'Medium' },
    { id: 5, text: 'Call Mom', completed: false, dueDate: '2025-06-19', priority: 'Medium' }
  ],
  filter: 'All'
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; dueDate: string; priority: Priority }>
    ) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
        completed: false
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: number; text: string; dueDate: string; priority: Priority }>
    ) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.dueDate = action.payload.dueDate;
        todo.priority = action.payload.priority;
      }
    },
    setFilter: (state, action: PayloadAction<'All' | 'Active' | 'Completed'>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
    }
  }
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  clearCompleted
} = todoSlice.actions;

export default todoSlice.reducer;
