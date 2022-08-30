import React from 'react';
import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';

import styles from './Menu.module.scss';

interface Props {
    title: string;
    onBack: () => void;
}
const cx = classNames.bind(styles);
const Header = ({ title, onBack }: Props) => {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <IoIosArrowBack />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
};

export default Header;
