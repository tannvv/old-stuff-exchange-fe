import React from 'react';
import classNames from 'classnames/bind';

import styles from './Separate.module.scss';

interface Props {
    className?: string;
}
const cx = classNames.bind(styles);
const Separate = ({ className }: Props) => {
    return (
        <div
            className={cx(
                {
                    [className as string]: className,
                },
                'wrapper',
            )}
        ></div>
    );
};

export default Separate;
