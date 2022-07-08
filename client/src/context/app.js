import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [room, setRoom] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const store = { socket, userName, roomName, room, isLoggedIn, setUserName, setRoomName, setRoom, setIsLoggedIn };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContext;
