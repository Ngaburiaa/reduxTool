import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      text: "Workout",
      completed: false
    },
    {
      id: 2,
      text: "Read a book",
      completed: false
    },
    {
      id: 3,
      text: "Finish React project",
      completed: false
    },
    {
      id: 4,
      text: "Buy groceries",
      completed: false
    },
    {
      id: 5,
      text: "Call Mom",
      completed: false
    }
  ]
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    }
  }
});

export const { addTodo, toggleTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;


