import React from 'react';
import classNames from 'classnames/bind';
import { Header } from '../components/Header';

import styles from './HeaderOnly.module.scss';
interface Props {
    children: JSX.Element;
}
const cx = classNames.bind(styles);
const HeaderOnly: React.FC<Props> = ({ children }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default HeaderOnly;
