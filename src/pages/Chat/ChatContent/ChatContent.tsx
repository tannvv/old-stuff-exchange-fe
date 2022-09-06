import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { BiPowerOff } from 'react-icons/bi';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import styles from './ChatContent.module.scss';
import { User } from '~/context/models';
import Image from '~/components/Image';
import { ChatInput } from './ChatInput';
import { useAuth } from '~/context/AuthContext';
import axiosChatClient, { hostSocketChat } from '~/api/axiosChatClient';

interface Props {
    currentChat?: User;
    className?: string;
}
const cx = classNames.bind(styles);
const ChatContent = ({ className, currentChat }: Props) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const scrollRef = useRef<any>();

    const socket = useRef<Socket>(io(hostSocketChat));
    const { user } = useAuth()!;

    const handleSendMsg = async (msg: string) => {
        if (user && currentChat) {
            await axiosChatClient.post('/api/messages/add-msg', {
                from: user.id,
                to: currentChat.id,
                message: msg,
            });
            socket.current.emit('send-msg', {
                from: user.id,
                to: currentChat.id,
                message: msg,
            });
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        }
    };

    useEffect(() => {
        if (user && hostSocketChat) {
            socket.current.emit('add-user', user.id);

            socket.current.on('msg-receive', (msg: string) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
        return () => {
            socket.current.off('msg-receive');
        };
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        axiosChatClient
            .post('/api/messages/get-msg', {
                from: user?.id,
                to: currentChat?.id,
            })
            .then((response) => {
                setMessages(response.data);
            });
    }, [currentChat, user]);
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Image src={currentChat?.imageUrl} alt="avatar" className={cx('avatar')} />
                    <p className={cx('name')}>{currentChat?.fullName}</p>
                </div>
                <button className={cx('btn-off')}>
                    <BiPowerOff />
                    {''}
                </button>
            </div>
            <div className={cx('chat-messages')}>
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            {/* <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div> */}
                            <div className={cx('message', `${message.fromSelf ? 'sended' : 'received'}`)}>
                                <div className={cx('content')}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
};

export default ChatContent;
