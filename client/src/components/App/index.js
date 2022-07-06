import React, { useContext } from 'react';
import AppContext from '../../context/app';
import Chat from '../Chat';
import Login from '../Login';
import './app.css';

const App = () => {
    const { isLoggedIn } = useContext(AppContext);

    return <div className='wrapper'>{isLoggedIn ? <Chat /> : <Login />}</div>;
};

export default App;
