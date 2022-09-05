import React from 'react';
import classNames from 'classnames/bind';

import styles from './InputField.module.scss';
const cx = classNames.bind(styles);
const Input = (props: any) => {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div className={cx('wrapper')}>
            {label && <label htmlFor={name}>{label}</label>}
            <Input
                id={name}
                {...field}
                type={type}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                invalid={showError}
            />
        </div>
    );
};

export default Input;
