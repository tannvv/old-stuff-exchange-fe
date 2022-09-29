import React from 'react';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useAuth } from '~/context/AuthContext';
import { AboutUs } from './AboutUs';
import { Wallet } from './Wallet';

const cx = classNames.bind(styles);
const Profile = () => {
    return (
        <div className={cx('wrapper', 'grid grid-cols-5 lg:h-[80vh]')}>
            <div className={cx('about-us', 'col-span-5 lg:col-span-3')}>
                <AboutUs />
            </div>
            <div className={cx('wallet', 'col-span-5 lg:col-span-2')}>
                <Wallet />
            </div>
        </div>
    );
};

export default Profile;
