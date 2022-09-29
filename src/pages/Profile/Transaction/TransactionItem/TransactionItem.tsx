import React from 'react';
import classNames from 'classnames/bind';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { IoWallet } from 'react-icons/io5';
import { GiReturnArrow } from 'react-icons/gi';

import styles from './TransactionItem.module.scss';
import Transaction from '~/context/models/Transaction';
import moment from 'moment';
import { TransactionType } from '~/config/constants';

interface Props {
    transaction: Transaction;
    index: number;
}
const cx = classNames.bind(styles);
const TransactionItem = ({ transaction, index }: Props) => {
    const DATE_TIME_FORMAT = 'HH:mm - YYYY-MM-DD';
    const createdAt = moment(transaction.createdAt).format(DATE_TIME_FORMAT);
    const getPrefixExchange = (type: string): string => {
        if (type === TransactionType.bought) {
            return '-';
        } else if ([TransactionType.recharge, TransactionType.refund, TransactionType.sell].includes(type)) {
            return '+';
        }
        return '';
    };
    const getIconTransaction = (type: string): JSX.Element => {
        if (type === TransactionType.bought) return <GoSignOut className="text-emerald-600" />;
        if (type === TransactionType.recharge) return <IoWallet className="text-yellow-500" />;
        if (type === TransactionType.refund) return <GiReturnArrow className="text-red-500" />;
        return <FaMoneyCheckAlt className="text-blue-500" />;
    };
    return (
        <div
            className={cx('wrapper')}
            style={{
                backgroundColor: index % 2 == 0 ? '' : '#f7f5f5',
                border: index % 2 == 0 ? '1px solid transparent' : '1px solid #e9e8e8',
            }}
        >
            <div className={cx('img')}>
                <span>{getIconTransaction(transaction.type)}</span>
            </div>
            <div className={cx('content')}>
                <p className={cx('description')}>{transaction.description}</p>
                <p className={cx('createdAt')}>{createdAt}</p>
                <div className={cx('balance')}>
                    <span className={cx('label')}>Balance : </span>
                    <span className={cx('value')}>{transaction.balance}.000đ</span>
                </div>
                <span className={cx('coin-exchange')}>
                    {getPrefixExchange(transaction.type)}
                    {transaction.coinExchange}.000đ
                </span>
            </div>
        </div>
    );
};

export default TransactionItem;
