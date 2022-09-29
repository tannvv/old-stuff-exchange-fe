import React from 'react';
import classNames from 'classnames/bind';

import styles from './Transaction.module.scss';
import Transaction from '~/context/models/Transaction';
import { TransactionItem } from './TransactionItem';

const cx = classNames.bind(styles);

interface Props {
    transactions: Transaction[];
}
const TransactionList = ({ transactions }: Props) => {
    return (
        <div className={cx('transactions')}>
            {transactions?.map((item, index) => {
                return <TransactionItem transaction={item} key={item.id} index={index} />;
            })}
        </div>
    );
};

export default TransactionList;
