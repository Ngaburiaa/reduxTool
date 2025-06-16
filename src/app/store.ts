import { configureStore } from '@reduxjs/toolkit';
import todoReducer  from '../Features/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // The AppDispatch type is used to infer the type of the dispatch function in the components

