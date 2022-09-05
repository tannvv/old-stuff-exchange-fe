import React from 'react';
import classNames from 'classnames/bind';
import { BiPowerOff } from 'react-icons/bi';

import styles from './ChatContent.module.scss';
import { User } from '~/context/models';
import Image from '~/components/Image';
import { ChatInput } from './ChatInput';

interface Props {
    currentChat?: User;
    className?: string;
}
const cx = classNames.bind(styles);
const ChatContent = ({ className, currentChat }: Props) => {
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

            <ChatInput />
        </div>
    );
};

export default ChatContent;
