import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';

import styles from './ImagePicker.module.scss';

interface Props {
    imageList: string[];
}
const cx = classNames.bind(styles);
const ImageList = ({ imageList }: Props) => {
    return (
        <div className={cx('image-list')}>
            {imageList.map((item, index) => {
                return <img src={item} alt="img" key={index} className={cx('image-item')} />;
            })}
        </div>
    );
};

export default ImageList;
