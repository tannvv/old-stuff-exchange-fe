import React from 'react';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import Post from '~/context/models/Post';
import Image from '~/components/Image';

interface Props {
    className?: string;
    post: Post;
}
const cx = classNames.bind(styles);
const Card = ({ className, post }: Props) => {
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('img')}>
                <Image src={post.imageUrl} alt="img" />
            </div>
            <div className={cx('content')}>
                <div className={cx('name')}>{post.title}</div>
                <span className={cx('origin-price')}>
                    Origin price:
                    <span>₫{post.price - 10}.000</span>
                </span>
                <div className={cx('footer')}>
                    <span className={cx('price')}>₫{post.price}.000</span>
                    <span className={cx('poster')}>{post.author?.fullName}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
