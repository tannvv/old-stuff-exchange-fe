import React from 'react';
import classNames from 'classnames/bind';
import { FieldProps, ErrorMessage } from 'formik';

import styles from './InputArea.module.scss';
import { IconType } from 'react-icons/lib';
import { ErrorInfo } from '../ErrorInfo';

interface InputProps extends FieldProps {
    label?: string;
    classNameLabel?: string;
    rightIcon?: IconType;
    classNameIcon?: string;
    className?: string;
    placeholder?: string;
    passProps?: any;
}
const cx = classNames.bind(styles);
const InputArea = (props: InputProps) => {
    const { field, form, label, className, rightIcon, classNameIcon, classNameLabel, placeholder, ...passProps } =
        props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const isShowError = errors[name] && touched[name];

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <label className={cx('label')} htmlFor="input-custom-area">
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
            <textarea
                className={cx('input-text')}
                id="input-custom-area"
                name={name}
                placeholder={placeholder}
                value={value}
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

export default InputArea;
