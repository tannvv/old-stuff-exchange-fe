import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userApi } from '~/api';
import { useAuth } from '~/context/AuthContext';
import { User } from '~/context/models';

import styles from './Chat.module.scss';
import { ChatContent } from './ChatContent';
import { ChatSidebar } from './ChatSidebar';

const cx = classNames.bind(styles);
const Chat = () => {
    const [usersChat, setUsersChat] = useState<User[]>([]);
    const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);

    const [searchParams] = useSearchParams();
    const { user } = useAuth()!;

    useEffect(() => {
        if (user) {
            userApi
                .getList({ apartmentId: user.building?.apartmentId, pageNumber: 1, pageSize: 100 })
                .then((response) => {
                    let usersData: User[] = response.data.map((user: any) => new User(user));
                    usersData = usersData.filter((u) => u.id !== user.id);
                    setUsersChat(usersData);
                });
        }
    }, []);
    return (
        <div className={cx('wrapper', 'grid grid-cols-4')}>
            <ChatSidebar className={cx('col-span-1')} usersChat={usersChat} setCurrentChat={setCurrentChat} />
            <ChatContent className={cx('col-span-3')} currentChat={currentChat} />
        </div>
    );
};

export default Chat;
