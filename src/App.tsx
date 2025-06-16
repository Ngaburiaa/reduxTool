import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../src/app/store'
import './App.css'
import Todo from './Components/TodoComponent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div>
            <Todo />
             <ToastContainer />
            </div>
        </Provider>
    );
};

export default App;
