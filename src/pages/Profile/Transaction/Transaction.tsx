import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Transaction.module.scss';
import { useAuth } from '~/context/AuthContext';
import Transaction from '~/context/models/Transaction';
import { transactionApi } from '~/api';
import { TransactionUserParams } from '~/api/transactionsApi';
import { LoadingInside } from '~/components/LoadingInside';
import { useToast } from '~/context/ToastContext';
import TransactionList from './TransactionList';

enum TabName {
    ALL = 'ALL',
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT',
}
const cx = classNames.bind(styles);
const TransactionComp = () => {
    const { user } = useAuth()!;
    const { showError } = useToast()!;

    const [isLoading, setLoading] = useState(false);
    const [tabName, setTabName] = useState<TabName>(TabName.ALL);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleChangeTab = (tabName: TabName) => {
        setTabName(tabName);
    };

    useEffect(() => {
        if (user) {
            const params: TransactionUserParams = {
                userId: user.id,
                page: 1,
                pageSize: 20,
                type: tabName === TabName.ALL ? '' : tabName,
            };
            setLoading(true);
            transactionApi
                .getByUserId(params)
                .then((response) => {
                    const transactions = response?.data?.map((tran: any) => new Transaction(tran));
                    console.log(transactions);
                    setTransactions(transactions);
                })
                .catch(() => {
                    showError({ detail: "Can't get transactions" });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [tabName]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>Transactions history</p>
            <div className={cx('header')}>
                <button
                    className={cx('btn-option', {
                        ['btn-active']: tabName === TabName.ALL ? true : false,
                    })}
                    onClick={() => handleChangeTab(TabName.ALL)}
                >
                    All
                </button>
                <button
                    className={cx('btn-option', {
                        ['btn-active']: tabName === TabName.CASH_IN ? true : false,
                    })}
                    onClick={() => handleChangeTab(TabName.CASH_IN)}
                >
                    Cash in
                </button>
                <button
                    className={cx('btn-option', {
                        ['btn-active']: tabName === TabName.CASH_OUT ? true : false,
                    })}
                    onClick={() => handleChangeTab(TabName.CASH_OUT)}
                >
                    Cash out
                </button>
            </div>
            <div className={cx('content')}>
                {isLoading ? (
                    <div className={cx('loading')}>
                        <LoadingInside className="w-[80px] h-[80px]" />
                    </div>
                ) : (
                    <TransactionList transactions={transactions} />
                )}
            </div>
        </div>
    );
};

export default TransactionComp;
