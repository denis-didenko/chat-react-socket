import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '../../context/app';
import Emoji from '../Emoji';

const MessagesForm = ({ setMessages }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const { socket, roomName, userName } = useContext(AppContext);

    const sendMessageHandler = async e => {
        e.preventDefault();

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
        //setIsVisibleEmoji(false);
    };

    return (
        <div className='messages-form'>
            <Emoji currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />

            <form onSubmit={sendMessageHandler}>
                <input
                    type='text'
                    placeholder='Type your message here'
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            sendMessageHandler();
                        }
                    }}
                />
                <button>Send</button>
            </form>
        </div>
    );
};

export default MessagesForm;
