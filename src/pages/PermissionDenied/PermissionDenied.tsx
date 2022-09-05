import React from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './PermissionDenied.module.scss';
import { Button } from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);
const PermissionDenied = () => {
    return (
        <div className={cx('wrapper')}>
            <div></div>
            <img src={images.permissionDenied} alt="Not found" className={cx('img')} />
            <p className={cx('content')}>Permission denied</p>
            <Button primary rounded to={config.routes.home} className={cx('back-to-home')}>
                Back to home
            </Button>
        </div>
    );
};

export default PermissionDenied;
