import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/app';
import './login.css';

const Login = () => {
    const [error, setError] = useState('');
    const { socket, userName, roomName, setUserName, setRoomName, setIsLoggedIn, setRoom } = useContext(AppContext);

    const submitFormHandler = e => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            setError('Please enter a username and room');
            return;
        }

        socket.emit('join-room', roomName);
        setIsLoggedIn(true);
    };

    const validateForm = () => {
        return userName.length && roomName.length;
    };

    return (
        <div className='login-block'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={submitFormHandler}>
                    <input type='text' placeholder='Username' onChange={e => setUserName(e.target.value)} />
                    <input type='text' placeholder='Room' onChange={e => setRoomName(e.target.value)} />
                    <button type='submit'>Login</button>
                    <div className='form-error'>{error}</div>
                </form>
            </div>
        </div>
    );
};

export default Login;
