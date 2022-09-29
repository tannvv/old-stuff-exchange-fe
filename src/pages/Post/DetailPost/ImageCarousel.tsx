import React from 'react';
import classNames from 'classnames/bind';
import { Carousel } from 'primereact/carousel';

import styles from './DetailPost.module.scss';
import Image from '~/components/Image';
import { LoadingInside } from '~/components/LoadingInside';
interface Props {
    imagesUrl: string[];
}
const cx = classNames.bind(styles);
const ImageCarousel = ({ imagesUrl }: Props) => {
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const productTemplate = (url: string) => {
        return (
            <div className={cx('product')}>
                <div className={cx('img-item')}>
                    <Image src={url} alt={'img'} className="w-full h-full rounded-xl" />
                </div>
            </div>
        );
    };
    return (
        <div className={cx('carousel-img')}>
            {imagesUrl.length > 0 ? (
                <Carousel
                    value={imagesUrl}
                    numVisible={3}
                    numScroll={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate}
                    indicatorsContentClassName="text-5xl"
                />
            ) : (
                <LoadingInside />
            )}
        </div>
    );
};

export default ImageCarousel;
