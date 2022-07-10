import React, { memo } from 'react';

const Messages = ({ messages, userName }) => {
    return (
        <div className='messages-list'>
            {messages.map(message => {
                return (
                    <div className='message' data-author={userName === message.author ? true : false} key={message.id}>
                        <div className='message-author'>{message.author}</div>
                        <div className='message-content'>{message.content}</div>
                        <div className='message-time'>{message.time}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default memo(Messages);
