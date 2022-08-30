import React from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './NotFound.module.scss';
import { Button } from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);
const NotFound = () => {
    return (
        <div className={cx('wrapper')}>
            <img src={images.notFound} alt="Not found" className={cx('img')} />
            <Button primary rounded to={config.routes.home} className={cx('back-to-home')}>
                Back to home
            </Button>
        </div>
    );
};

export default NotFound;
