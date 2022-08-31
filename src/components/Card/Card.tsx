import React from 'react';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';

interface Props {
    className?: string;
}
const cx = classNames.bind(styles);
const Card = ({ className }: Props) => {
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('img')}>
                <img src="https://cf.shopee.vn/file/d51d3547063d827d1ca204d37a0efdbd_tn" alt="img" />
            </div>
            <div className={cx('content')}>
                <div className={cx('name')}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.ipsum dolor sit amet consectetur adipisicing
                    elit
                </div>
                <span className={cx('origin-price')}>
                    Origin price:
                    <span>₫90.000</span>
                </span>
                <div className={cx('footer')}>
                    <span className={cx('price')}>₫76.000</span>
                    <span className={cx('poster')}>Tan Nguyen</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
