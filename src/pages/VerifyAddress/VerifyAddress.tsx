import React from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './VerifyAddress.module.scss';
import { VerifyAddressForm } from './VerifyAddressForm';

const cx = classNames.bind(styles);
const VerifyAddress = (): JSX.Element => {
    return (
        <div className={cx('wrapper', 'grid lg:grid-cols-5')}>
            <div className={cx('form-cover', 'rounded-3xl bg-white lg:col-span-3 lg:rounded-none lg:rounded-l-3xl')}>
                <VerifyAddressForm />
            </div>
            <div className={cx('bg-cover', 'bg-primary hidden lg:block lg:col-span-2 lg:rounded-r-3xl')}></div>
            <img src={images.bgSignUp} alt="bg-img" className={cx('img', 'hidden lg:block')} />
        </div>
    );
};

export default VerifyAddress;
