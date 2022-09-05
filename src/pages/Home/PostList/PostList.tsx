import React from 'react';
import classNames from 'classnames/bind';

import styles from './PostList.module.scss';
import { Card } from '~/components/Card';
import Post from '~/context/models/Post';
import { LoadingInside } from '~/components/LoadingInside';

interface Props {
    posts: Post[];
    isLoading: boolean;
    className?: string;
}
const cx = classNames.bind(styles);
const PostList = ({ posts, isLoading, className }: Props) => {
    return (
        <div
            className={cx('wrapper', 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10', {
                [className as string]: className,
            })}
        >
            {posts.map((post, index) => {
                return <Card post={post} key={`${post.id}-${index}`} />;
            })}
            {isLoading && <LoadingInside className={cx('loading', 'w-full col-span-full')} />}
        </div>
    );
};

export default PostList;
