import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { IconType } from 'react-icons';

import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

interface Props {
    to?: string;
    primary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children: ReactNode;
    className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClick?: () => void;
    passProps?: any;
}
const cx = classNames.bind(styles);
const Button = ({
    to,
    primary = false,
    rounded = false,
    outline = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}: Props) => {
    let Comp: any = 'button';
    const _props: any = {
        onClick,
        ...passProps,
    };
    // remove event listener when is disable
    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }
    if (to) {
        _props.to = to;
        Comp = Link;
    }
    const classes = cx('wrapper', {
        primary,
        rounded,
        outline,
        disabled,
        small,
        large,
    });

    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;
