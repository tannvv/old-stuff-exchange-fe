import classNames from 'classnames/bind';

import styles from './Button.module.scss';
import { Link, Location } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface Props {
    to?: string;
    primary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    location?: Location;
    children: ReactNode;
    className?: string;
    leftIcon?: IconType;
    rightIcon?: IconType;
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
    location,
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
    const active = location && location?.pathname === to ? true : false;
    const classes = cx('wrapper', {
        [className as string]: className,
        primary,
        rounded,
        outline,
        disabled,
        small,
        large,
        active,
    });

    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={cx('icon')}>{React.createElement(leftIcon)}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{React.createElement(rightIcon)}</span>}
        </Comp>
    );
};

export default Button;
