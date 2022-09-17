import React from 'react';
import classNames from 'classnames/bind';

import styles from './Wallet.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Wallet = () => {
    return (
        <div className={cx('wrapper')}>
            <img src={images.avatar} alt="profile" className={cx('img')} />
        </div>
    );
};

export default Wallet;
