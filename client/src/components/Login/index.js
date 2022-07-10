import React, { useContext, useState, useRef } from 'react';
import AppContext from '../../context/app';
import './login.css';

const Login = () => {
    const [error, setError] = useState('');
    const { socket, setIsLoggedIn, setUserName, setRoomName } = useContext(AppContext);
    const nameRef = useRef(null);
    const roomRef = useRef(null);

    const submitFormHandler = e => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            setError('Please enter a username and room');
            return;
        }

        socket.emit('join-room', roomRef.current.value);
        setIsLoggedIn(true);
        setUserName(nameRef.current.value);
        setRoomName(roomRef.current.value);
    };

    const validateForm = () => {
        return nameRef.current.value && roomRef.current.value;
    };

    return (
        <div className='login-block'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={submitFormHandler}>
                    <input type='text' placeholder='Username' ref={nameRef} />
                    <input type='text' placeholder='Room' ref={roomRef} />
                    <button type='submit'>Login</button>
                    <div className='form-error'>{error}</div>
                </form>
            </div>
        </div>
    );
};

export default Login;
