import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../src/app/store'
import './App.css'
import Todo from './Components/TodoComponent';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div>
            <Todo />
            </div>
        </Provider>
    );
};

export default App;
