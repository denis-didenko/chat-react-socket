import React, { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Picker from 'emoji-picker-react';
import AppContext from '../../context/app';
import Messages from '../Messages';
import './chat.css';

const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);
    const { socket, room, roomName, userName, setRoom } = useContext(AppContext);

    const sendMessage = async () => {
        const messageData = {
            id: uuidv4(),
            author: userName,
            room: roomName,
            content: currentMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        await socket.emit('send-message', messageData);
        setMessages(list => [...list, messageData]);
        setCurrentMessage('');
        setIsVisibleEmoji(false);
    };

    useEffect(() => {
        socket.on('receive-message', data => {
            setMessages(list => [...list, data]);
        });
        socket.on('joined-room-clients', data => {
            setRoom(data);
        });
    }, [socket]);

    return (
        <div className='chat-block'>
            <div className='chat-header'>
                <h3>
                    Room name: <span>{roomName}</span>
                </h3>
                <p>{room} online users</p>
            </div>
            <div className='chat-body'>
                <Messages messages={messages} />
            </div>
            <div className='chat-footer'>
                <div className='chat-emoji'>
                    {isVisibleEmoji && (
                        <Picker
                            onEmojiClick={(event, { emoji }) => {
                                setCurrentMessage(currentMessage + emoji);
                            }}
                            preload='true'
                            disableSearchBar='true'
                            groupVisibility={{
                                animals_nature: false,
                                food_drink: false,
                                travel_places: false,
                                activities: false,
                                objects: false,
                                symbols: false,
                                flags: false,
                                recently_used: false,
                            }}
                        />
                    )}
                    <div className='emoji-icon' onClick={() => setIsVisibleEmoji(!isVisibleEmoji)}>
                        <span className='material-symbols-rounded'>sentiment_satisfied</span>
                    </div>
                </div>
                <input
                    type='text'
                    placeholder='Type your message here'
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
