import React from 'react';
import { ErrorMessageProps } from 'formik';
import classNames from 'classnames/bind';

import styles from './ErrorInfo.module.scss';

const cx = classNames.bind(styles);
const ErrorInfo = (error: string) => {
    return <div className={cx('error-msg')}>{error}</div>;
};

export default ErrorInfo;
