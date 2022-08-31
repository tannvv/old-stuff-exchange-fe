import React from 'react';
import classNames from 'classnames/bind';
import { Header } from '../components/Header';

import styles from './HeaderOnly.module.scss';
interface Props {
    children: JSX.Element;
    className?: string;
}
const cx = classNames.bind(styles);
const HeaderOnly: React.FC<Props> = ({ children, className }: Props) => {
    return (
        <div className={cx('wrapper', { [className as string]: className })}>
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default HeaderOnly;
