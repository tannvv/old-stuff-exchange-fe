import React from 'react';
import classNames from 'classnames/bind';

import styles from './LoadingInside.module.scss';
import images from '~/assets/images';

interface Props {
    className?: string;
}
const cx = classNames.bind(styles);
const LoadingInside = ({ className }: Props) => {
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <img src={images.loadingInside} alt="loading" className={cx('img')} />
        </div>
    );
};

export default LoadingInside;
