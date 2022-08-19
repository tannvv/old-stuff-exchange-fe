import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Header } from '../components/Header';
import { Sidebar } from './Sidebar';

const cx = classNames.bind(styles);
interface Props {
    children: JSX.Element;
}
const DefaultLayout = ({ children }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
