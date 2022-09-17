import React from 'react';
import classNames from 'classnames/bind';

import styles from './AboutUs.module.scss';
import { useAuth } from '~/context/AuthContext';
import { Separate } from '~/components/Separate';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const AboutUs = () => {
    const { user } = useAuth()!;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image src={user?.imageUrl} alt="avatar" className={cx('avatar')} />
                <div className={cx('form-name')}>
                    <p className={cx('label')}>Name</p>
                    <span className={cx('name')}>{user?.fullName}</span>
                </div>
            </div>
            <div className={cx('about')}>
                <div className={cx('about-control')}>
                    <p className={cx('label')}>Số điện thoại</p>
                    <span className={cx('value')}>{user?.phone ? user?.phone : '+38 4616791'}</span>
                </div>
                <div className={cx('about-control')}>
                    <p className={cx('label')}>Facebook</p>
                    <span className={cx('value')}>Chưa kết nối facebook</span>
                    <button className={cx('btn-connect')}>Connect</button>
                </div>
                <div className={cx('about-control')}>
                    <p className={cx('label')}>Google</p>
                    <span className={cx('value active')}>Đã kết nối google</span>
                </div>
                <div className={cx('about-control')}>
                    <p className={cx('label')}>Email</p>
                    <span className={cx('value')}>{user?.email}</span>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
