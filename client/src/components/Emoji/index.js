import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const Emoji = ({ currentMessage, setCurrentMessage }) => {
    const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);

    return (
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
    );
};

export default Emoji;
