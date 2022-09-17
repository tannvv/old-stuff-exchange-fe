import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { BiPowerOff } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

import styles from './ChatContent.module.scss';
import { User } from '~/context/models';
import Image from '~/components/Image';
import { ChatInput } from './ChatInput';
import { useAuth } from '~/context/AuthContext';
import {
    HubConnectionBuilder,
    LogLevel,
    HubConnection,
    HttpTransportType,
    HubConnectionState,
} from '@microsoft/signalr';
import { domainName } from '~/api/axiosClient';
import { messageApi } from '~/api';
import { async } from '@firebase/util';

interface Props {
    currentChat?: User;
    className?: string;
}
class Message {
    fromSelf: boolean;
    message: string;

    constructor(params: any, senderId: string | undefined) {
        this.fromSelf = params.senderId === senderId;
        this.message = params.content;
    }
}
const cx = classNames.bind(styles);
const ChatContent = ({ className, currentChat }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
    const scrollRef = useRef<any>();

    // const socket = useRef<Socket>(io(hostSocketChat));
    const hubConnection = useRef<HubConnection | null>(null);
    const { user } = useAuth()!;

    // const handleSendMsg = async (msg: string) => {
    //     if (user && currentChat) {
    //         await axiosChatClient.post('/api/messages/add-msg', {
    //             from: user.id,
    //             to: currentChat.id,
    //             message: msg,
    //         });
    //         socket.current.emit('send-msg', {
    //             from: user.id,
    //             to: currentChat.id,
    //             message: msg,
    //         });
    //         const msgs = [...messages];
    //         msgs.push({ fromSelf: true, message: msg });
    //         setMessages(msgs);
    //     }
    // };

    const handleSendMsg = async (msg: string) => {
        if (user && currentChat) {
            await messageApi.create({
                senderId: user.id ?? '',
                receiverId: currentChat.id,
                content: msg,
            });
            hubConnection.current?.invoke('SendMessage', currentChat.id, msg);
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        }
    };

    // signalR

    const connectHub = async () => {
        try {
            await hubConnection.current?.start();
            if (hubConnection.current?.state === HubConnectionState.Connected) {
                await hubConnection.current?.invoke('AddUser', user?.id);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const disconnectHub = async () => {
        try {
            if (hubConnection.current?.state === HubConnectionState.Connected) {
                await hubConnection.current?.invoke('RemoveUser', user?.id);
                await hubConnection.current?.stop();
                hubConnection.current = null;
            }
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        if (hubConnection.current?.state === HubConnectionState.Connected) {
            hubConnection.current.stop();
        }
        hubConnection.current = new HubConnectionBuilder()
            .withUrl(`${domainName}/chat`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .configureLogging(LogLevel.Information)
            .build();
        hubConnection.current.on('message-receive', (message: string, senderId: string) => {
            if (senderId === currentChat?.id) {
                setArrivalMessage({ fromSelf: false, message: message });
            }
        });
        connectHub();
        return () => {
            disconnectHub();
        };
    }, [currentChat]);

    // end signalR

    // useEffect(() => {
    //     if (user && hostSocketChat) {
    //         socket.current.emit('add-user', user.id);

    //         socket.current.on('msg-receive', (msg: string) => {
    //             setArrivalMessage({ fromSelf: false, message: msg });
    //         });
    //     }
    //     return () => {
    //         socket.current.off('msg-receive');
    //     };
    // }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // useEffect(() => {
    //     axiosChatClient
    //         .post('/api/messages/get-msg', {
    //             from: user?.id,
    //             to: currentChat?.id,
    //         })
    //         .then((response) => {
    //             setMessages(response.data);
    //         });
    // }, [currentChat, user]);

    useEffect(() => {
        if (user?.id && currentChat?.id) {
            messageApi
                .getAll({
                    senderId: user?.id ?? '',
                    receiverId: currentChat?.id ?? '',
                    isFull: true,
                })
                .then((response) => {
                    const messageData: Message[] = response.data.map((m: any) => {
                        return new Message(m, user?.id);
                    });
                    setMessages(messageData);
                });
        }
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
