import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './PostList.module.scss';
import Post from '~/context/models/Post';
import PostItem from './PostItem';

interface Props {
    posts: Post[];
    fetchData: (isRefresh: boolean) => Promise<void>;
    onRefresh: () => void;
}
const cx = classNames.bind(styles);
const PostList = ({ posts, fetchData, onRefresh }: Props) => {
    return (
        <div className={cx('wrapper', 'grid  grid-cols-1 gap-2 md:grid-cols-2 md:gap-6')}>
            {posts.map((p, index) => {
                return <PostItem post={p} key={index} fetchData={fetchData} onRefresh={onRefresh} />;
            })}
        </div>
    );
};

export default PostList;
