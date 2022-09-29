import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import { FieldProps, ErrorMessage } from 'formik';

import styles from './Input.module.scss';
import { IconType } from 'react-icons/lib';
import { ErrorInfo } from '../ErrorInfo';

interface InputProps extends FieldProps {
    label?: string;
    classNameLabel?: string;
    rightIcon?: IconType;
    classNameIcon?: string;
    className?: string;
    classNameInput?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    passProps?: any;
}
const cx = classNames.bind(styles);
const Input = (props: InputProps) => {
    const {
        field,
        form,
        label,
        className,
        rightIcon,
        classNameIcon,
        classNameLabel,
        classNameInput,
        placeholder,
        onChange,
        ...passProps
    } = props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const isShowError = errors[name] && touched[name];

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const changeEvent = {
            target: {
                name: name,
                value: event.target.value,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <div
            className={cx('form-group', {
                [className as string]: className,
            })}
        >
            {(label || rightIcon) && (
                <label className={cx('label')} htmlFor={name}>
                    {rightIcon && (
                        <p
                            className={cx('icon', {
                                [classNameIcon as string]: classNameIcon,
                            })}
                        >
                            {React.createElement(rightIcon)}
                        </p>
                    )}
                    {label && (
                        <p
                            className={cx('content', {
                                [classNameLabel as string]: classNameLabel,
                            })}
                        >
                            {label}
                        </p>
                    )}
                </label>
            )}
            <input
                className={cx('input-text', {
                    [classNameInput as string]: classNameInput,
                })}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                onChange={handleChange}
                {...passProps}
            />
            {isShowError && (
                <div className={cx('error-message')}>
                    <ErrorMessage name={name} render={ErrorInfo} />
                </div>
            )}
        </div>
    );
};

export default Input;
