import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import styles from './Payment.module.scss';
import { Post } from '~/context/models';
import { useAuth } from '~/context/AuthContext';
import { WalletType } from '~/config/constants';
import { useLoading } from '~/context/LoadingContext';
import { postApi } from '~/api';
import { ChangeStatusPost } from '~/api/postApi';
import POST_STATUS from '~/config/constants/PostStatus';
import { useToast } from '~/context/ToastContext';

interface Props {
    post: Post;
    setIsPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
const cx = classNames.bind(styles);
const Payment = ({ post, setIsPayment }: Props) => {
    const { user, refreshWallets } = useAuth()!;
    const { disableLoading, enableLoading } = useLoading()!;
    const { showSuccess, showError, showInfo } = useToast()!;
    const { wallets } = user!;
    // const [defaultWallet, promotionWallet] = wallets!;

    const handlePayment = (walletType: string) => {
        confirmDialog({
            message: 'Are you sure to pay this post?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                enableLoading();
                const dataRequest: ChangeStatusPost = {
                    postId: post.id,
                    status: POST_STATUS.DELIVERY,
                    walletType: walletType,
                };
                postApi
                    .changeStatus(dataRequest)
                    .then((response) => {
                        refreshWallets();
                        showSuccess({ detail: 'Payment post success' });
                    })
                    .catch((error) => {
                        showError({ detail: 'Payment post failed' });
                    })
                    .finally(() => {
                        disableLoading();
                    });
            },
            reject: () => {
                showInfo({ detail: 'You have rejected.' });
            },
        });
    };

    useEffect(() => {
        refreshWallets();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('current', 'header')}>Current balance: </p>
            <div className={cx('balance')}>
                <div className={cx('wallet', 'default')}>
                    <span className={cx('label')}>Default wallet:</span>
                    <span className={cx('value')}>{wallets![0]?.balance ?? 0}.000đ</span>
                </div>
                <div className={cx('wallet', 'promotion')}>
                    <span className={cx('label')}>Promotion wallet:</span>
                    <span className={cx('value')}>{wallets![1]?.balance ?? 0}.000đ</span>
                </div>
            </div>
            <p className={cx('future', 'header')}>Future balance: </p>
            <div className={cx('balance', 'future')}>
                <div className={cx('wallet', 'default')}>
                    <span className={cx('label')}>Default wallet:</span>
                    <span className={cx('value')}>{wallets![0]?.balance - post.price}.000đ</span>
                </div>
                <div className={cx('wallet', 'promotion')}>
                    <span className={cx('label')}>Promotion wallet:</span>
                    <span className={cx('value')}>{wallets![1]?.balance - post.price}.000đ</span>
                </div>
            </div>
            <p className={cx('option')}>Select wallet to payment </p>
            <div className={cx('way-payment')}>
                <button
                    className={cx('btn', 'btn-default')}
                    onClick={() => handlePayment(WalletType.default)}
                    disabled={wallets![0]?.balance - post.price < 0}
                >
                    Default wallet
                </button>
                <button
                    className={cx('btn', 'btn-promotion')}
                    onClick={() => handlePayment(WalletType.promotion)}
                    disabled={wallets![1]?.balance - post.price < 0}
                >
                    Promotion wallet
                </button>
            </div>
        </div>
    );
};

export default Payment;
