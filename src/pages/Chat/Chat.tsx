import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { userApi } from '~/api';
import { useAuth } from '~/context/AuthContext';
import { User } from '~/context/models';
import { Splitter, SplitterPanel, SplitterResizeEndParams } from 'primereact/splitter';

import styles from './Chat.module.scss';
import { ChatContent } from './ChatContent';
import { ChatSidebar } from './ChatSidebar';

const cx = classNames.bind(styles);
const Chat = () => {
    const [usersChat, setUsersChat] = useState<User[]>([]);
    const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);
    const [splitterSize, setSplitterSize] = useState<number[]>([25, 75]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [searchParams] = useSearchParams();
    const { user } = useAuth()!;

    const handleResizedEnd = (event: SplitterResizeEndParams) => {
        localStorage.setItem('splitter-size', JSON.stringify(event.sizes));
    };

    useEffect(() => {
        if (localStorage.getItem('splitter-size')) {
            const sizes: number[] = JSON.parse(localStorage.getItem('splitter-size') ?? '');
            setSplitterSize(sizes);
        }
    }, [currentChat]);

    useEffect(() => {
        if (localStorage.getItem('splitter-size')) {
            const sizes: number[] = JSON.parse(localStorage.getItem('splitter-size') ?? '');
            setSplitterSize(sizes);
        }

        if (user) {
            userApi
                .getList({ apartmentId: user.building?.apartmentId, pageNumber: 1, pageSize: 100 })
                .then((response) => {
                    let usersData: User[] = response.data.map((user: any) => new User(user));
                    usersData = usersData.filter((u) => u.id !== user.id);
                    setUsersChat(usersData);
                    const userChatId = searchParams.get('userId');
                    if (userChatId) {
                        const userChatIndex = usersData.findIndex((u) => u.id === userChatId);
                        setCurrentChat(usersData[userChatIndex]);
                        setSelectedIndex(userChatIndex);
                    }
                });
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Splitter onResizeEnd={handleResizedEnd} style={{ border: '1px solid #F5F5F5' }} stateKey="splitter-sizes">
                <SplitterPanel className={cx('suggest-account')} size={splitterSize[0]}>
                    <ChatSidebar
                        className={cx('w-full')}
                        usersChat={usersChat}
                        setCurrentChat={setCurrentChat}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                </SplitterPanel>
                <SplitterPanel className={cx('chat-content')} size={splitterSize[1]} minSize={40}>
                    <ChatContent
                        className={cx('w-full')}
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                        setSelectedIndex={setSelectedIndex}
                    />
                </SplitterPanel>
            </Splitter>
        </div>
    );
};

export default Chat;
