import React, { useContext, useState } from 'react';
import AppContext from '../../context/app';
import './login.css';

const Login = () => {
    const [error, setError] = useState('');
    const { socket, username, room, setUsername, setRoom, setIsLoggedIn } = useContext(AppContext);

    const submitFormHandler = e => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            setError('Please enter a username and room');
            return;
        }

        socket.emit('join-room', room);
        setIsLoggedIn(true);
    };

    const validateForm = () => {
        return username.length && room.length;
    };

    return (
        <div className='login-block'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={submitFormHandler}>
                    <input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)} />
                    <input type='text' placeholder='Room' onChange={e => setRoom(e.target.value)} />
                    <button type='submit'>Login</button>
                    <div className='form-error'>{error}</div>
                </form>
            </div>
        </div>
    );
};

export default Login;
