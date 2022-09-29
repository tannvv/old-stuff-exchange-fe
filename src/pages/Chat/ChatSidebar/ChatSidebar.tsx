import React from 'react';
import classNames from 'classnames/bind';

import styles from './ChatSidebar.module.scss';
import { User } from '~/context/models';
import { SuggestChat } from '~/components/SuggestChat';
import { useAuth } from '~/context/AuthContext';
import Image from '~/components/Image';

interface Props {
    className?: string;
    usersChat: User[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    setCurrentChat: React.Dispatch<React.SetStateAction<User | undefined>>;
}
const cx = classNames.bind(styles);
const ChatSidebar = ({ className, usersChat, setCurrentChat, setSelectedIndex, selectedIndex }: Props) => {
    const { user } = useAuth()!;

    const handleClickItem = (user: User) => {
        setCurrentChat(user);
    };
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <SuggestChat
                users={usersChat}
                className={cx('suggest-chat', 'max-h-[70vh]')}
                onClick={handleClickItem}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <div className={cx('current-user')}>
                <Image src={user?.imageUrl} alt="avatar" />
                <div className={cx('info')}>
                    <span className={cx('name')}>{user?.fullName}</span>
                    <span className={cx('email')}>{user?.email}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
