import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

//const socket = io('http://localhost:5000');
const socket = io('https://chat-react-socket-backend.herokuapp.com');

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomUsersCount, setRoomUsersCount] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const store = { socket, userName, roomName, roomUsersCount, isLoggedIn, setUserName, setRoomName, setRoomUsersCount, setIsLoggedIn };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContext;
