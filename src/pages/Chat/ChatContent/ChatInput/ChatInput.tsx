import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

import styles from './ChatInput.module.scss';

interface Props {
    handleSendMsg: (msg: string) => void;
}
const cx = classNames.bind(styles);
const ChatInput = ({ handleSendMsg }: Props) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (event: any, emoji: any) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (event: any) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('button-container')}>
                <div className={cx('emoji')}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className={cx('input-container')}>
                <input
                    type="text"
                    name=""
                    placeholder="type your message here"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button className={cx('submit')} onClick={sendChat}>
                    <IoMdSend />
                    {''}
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
