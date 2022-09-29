import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Wallet.module.scss';
import images from '~/assets/images';
import { useAuth } from '~/context/AuthContext';
import { walletApi } from '~/api';
import { Transaction } from '../Transaction';

const cx = classNames.bind(styles);
const Wallet = () => {
    const { user, refreshWallets } = useAuth()!;
    const { wallets } = user!;
    const [defaultWallet, promotionWallet] = wallets!;

    useEffect(() => {
        refreshWallets();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {/* <img src={images.avatar} alt="profile" className={cx('img')} /> */}
            <div className={cx('header')}>
                <span>Wallets info: </span>
            </div>
            <div className={cx('content')}>
                <div className={cx('wallet')}>
                    <span className={cx('label')}>Default wallet : </span>
                    <span className={cx('balance')}>{defaultWallet.balance}.000đ</span>
                </div>
                <div className={cx('wallet')}>
                    <span className={cx('label')}>Promotion wallet : </span>
                    <span className={cx('balance')}>{promotionWallet.balance}.000đ</span>
                </div>
            </div>
            <div className={cx('transaction')}>
                <Transaction />
            </div>
        </div>
    );
};

export default Wallet;
