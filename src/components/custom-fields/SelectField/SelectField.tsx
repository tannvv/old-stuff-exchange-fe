import React, { useEffect, useRef } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import classNames from 'classnames/bind';
import { IconType } from 'react-icons';
import { ErrorMessage, FieldProps } from 'formik';

import styles from './SelectField.module.scss';
import { useToast } from '~/context/ToastContext';
import { ErrorInfo } from '../ErrorInfo';

interface Option {
    label: string;
    value: any;
}
interface SelectProps extends FieldProps {
    label?: string;
    classNameLabel?: string;
    className?: string;
    placeholder?: string;
    options: Option[];
    selectStyles: StylesConfig;
    passProps?: any;
}
const cx = classNames.bind(styles);
const SelectField = (props: SelectProps) => {
    const { showError } = useToast()!;

    const { field, form, label, className, options, classNameLabel, placeholder, selectStyles, ...passProps } = props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const isShowError = errors[name] && touched[name];

    const selectedOption = options?.find((option: Option) => option.value === value);

    const handleSelectedOptionChange = (selectedOption: any) => {
        const changeEvent = {
            target: {
                name: name,
                value: selectedOption?.value,
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
            {label && (
                <label
                    htmlFor={name}
                    className={cx('label', {
                        [classNameLabel as string]: classNameLabel,
                    })}
                >
                    {label}
                </label>
            )}
            <div className={cx('select')}>
                <Select
                    {...field}
                    id={name}
                    key={name}
                    value={selectedOption || ''}
                    placeholder={placeholder}
                    options={options}
                    onChange={handleSelectedOptionChange}
                    isDisabled={options.length === 0}
                    isClearable={true}
                    styles={selectStyles}
                />
            </div>
            {isShowError && (
                <div className={cx('error-message')}>
                    <ErrorMessage name={name} render={ErrorInfo} />
                </div>
            )}
        </div>
    );
};

export default SelectField;
