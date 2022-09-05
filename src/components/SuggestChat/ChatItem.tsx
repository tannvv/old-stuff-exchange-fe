import React from 'react';
import classNames from 'classnames/bind';
import { BsCheckCircleFill } from 'react-icons/bs';

import styles from './SuggestChat.module.scss';
import { User } from '~/context/models';
import Image from '~/components/Image';
import { useNavigate } from 'react-router-dom';

interface Props {
    user: User;
    isSelected?: boolean;
    onClick?: () => void;
}
const cx = classNames.bind(styles);
const ChatItem = ({ user, isSelected = false, onClick }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
    };
    return (
        <div
            className={cx('chat-item', `${isSelected ? 'selected' : ''}`)}
            // onClick={() => navigate(`/chat?user=${user.id}`)}
            onClick={handleClick}
        >
            <Image src={user.imageUrl} alt="avatar" className={cx('avatar')} />
            <div className={cx('info')}>
                <span className={cx('name')}>
                    {user.fullName}
                    <span className={cx('tick')}>
                        <BsCheckCircleFill />
                    </span>
                </span>
                <span className={cx('email')}>{user.email}</span>
            </div>
        </div>
    );
};

export default ChatItem;
