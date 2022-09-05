import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './SuggestChat.module.scss';
import ChatItem from './ChatItem';
import { User } from '~/context/models';
import { useAuth } from '~/context/AuthContext';
import { LoadingInside } from '~/components/LoadingInside';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
    users: User[];
    className?: string;
    clickType?: string;
    onClick?: (user: User) => void;
}
const cx = classNames.bind(styles);
const SuggestChat = ({ users, className, clickType, onClick }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [searchParams] = useSearchParams();
    const { user } = useAuth()!;

    const navigate = useNavigate();

    useEffect(() => {
        const findIndex = users.findIndex((u) => u.id === searchParams.get('user'));
        if (findIndex !== -1) {
            const userArr = users[findIndex];
            if (onClick) onClick(userArr);
            setSelectedIndex(findIndex);
        }
    }, [users]);

    return (
        <div className={cx('wrapper', { [className as string]: className })}>
            <p className={cx('suggest-account')}>Suggest accounts</p>

            {users ? (
                users.map((user, index) => {
                    let callback = () => {
                        setSelectedIndex(index);
                        if (onClick) onClick(user);
                    };
                    if (clickType === 'navigate') {
                        callback = () => navigate(`/chat?user=${user.id}`);
                    }
                    return (
                        <ChatItem user={user} key={user.id} isSelected={selectedIndex === index} onClick={callback} />
                    );
                })
            ) : (
                <LoadingInside />
            )}
        </div>
    );
};

export default SuggestChat;
