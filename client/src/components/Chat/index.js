import React from 'react';
import './chat.css';

const Chat = () => {
    return (
        <div className='chat-block'>
            <div className='chat-header'></div>
            <div className='chat-body'></div>
            <div className='chat-footer'>
                <input type='text' placeholder='Type your message here' />
                <button>Send</button>
            </div>
        </div>
    );
};

export default Chat;
