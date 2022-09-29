import React, { ChangeEvent, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FieldProps, ErrorMessage } from 'formik';
import { IoMdRemoveCircle } from 'react-icons/io';

import styles from './ImagePicker.module.scss';
import { IconType } from 'react-icons';
import { readFileAsync } from '~/utils/fileUtils';
import ImageList from './ImageList';
import { ErrorInfo } from '../ErrorInfo';
import Tippy from '@tippyjs/react';
interface ImagePickerProps extends FieldProps {
    label?: string;
    classNameLabel: string;
    icon?: IconType;
    classNameIcon?: string;
    className?: string;
    passProps?: any;
}
const cx = classNames.bind(styles);
const ImagePicker = (props: ImagePickerProps) => {
    const { field, form, label, className, icon, classNameIcon, classNameLabel, ...passProps } = props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const isShowError = errors[name] && touched[name];
    const [imageSelected, setImageSelected] = useState<string[]>([]);

    const readData = async (files: FileList | null) => {
        if (files) {
            let arrayData: string[] = [];
            await Array.from(files).forEach(async (item) => {
                arrayData.push((await readFileAsync(item)) ?? '');
                setImageSelected(arrayData);
            });
        }
    };

    const handleClearImage = () => {
        setImageSelected([]);
        form.setFieldValue(name, null);
    };

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const changeEvent = {
            target: {
                name: name,
                value: event.target.files,
            },
        };
        field.onChange(changeEvent);
        await readData(event.target.files);
    };

    useEffect(() => {
        if (!value) {
            setImageSelected([]);
        }
    }, [value]);

    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('form-group')}>
                <div className={cx('header')}>
                    {(label || icon) && (
                        <label className={cx('label')} htmlFor="image-picker">
                            {icon && (
                                <p
                                    className={cx('icon', {
                                        [classNameIcon as string]: classNameIcon,
                                    })}
                                >
                                    {React.createElement(icon)}
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
                    {imageSelected.length > 0 && (
                        <Tippy content="Clear" delay={[50, 50]} placement={'bottom'}>
                            <button type="button" className={cx('btn-clear')} onClick={handleClearImage}>
                                <IoMdRemoveCircle />
                            </button>
                        </Tippy>
                    )}
                </div>
                <input
                    {...passProps}
                    type="file"
                    className={cx('input-image')}
                    id="image-picker"
                    name={name}
                    multiple={true}
                    onChange={handleImageChange}
                    accept="image/*"
                />
                {imageSelected && <ImageList imageList={imageSelected} />}
                {isShowError && <ErrorMessage name={name} render={ErrorInfo} />}
            </div>
        </div>
    );
};

export default ImagePicker;
