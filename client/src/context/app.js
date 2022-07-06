import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const store = { socket, username, room, isLoggedIn, setUsername, setRoom, setIsLoggedIn };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContext;
