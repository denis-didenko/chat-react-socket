import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/app';
import Messages from '../Messages';
import MessagesForm from '../MessagesForm';
import './chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const { socket, roomUsersCount, roomName, setRoomUsersCount, userName } = useContext(AppContext);

    useEffect(() => {
        socket.on('receive-message', data => {
            setMessages(list => [...list, data]);
        });
        socket.on('joined-room-clients', data => {
            setRoomUsersCount(data);
        });
        // eslint-disable-next-line
    }, [socket]);

    return (
        <div className='chat-block'>
            <div className='chat-header'>
                <h3>
                    Room name: <span>{roomName}</span>
                </h3>
                <p>{roomUsersCount} online users</p>
            </div>
            <div className='chat-body'>
                <Messages messages={messages} userName={userName} />
            </div>
            <div className='chat-footer'>
                <MessagesForm setMessages={setMessages} />
            </div>
        </div>
    );
};

export default Chat;
