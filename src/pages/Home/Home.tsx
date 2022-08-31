import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { Card } from '~/components/Card';
import Post from '~/context/models/Post';
import { postApi } from '~/api';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);
const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const { enableLoading, disableLoading } = useLoading()!;
    useEffect(() => {
        enableLoading();
        postApi
            .getList({ page: page, pageSize: 15 })
            .then((response) => {
                let postData: Post[] = response.data?.map((post: any) => new Post(post));
                console.log(postData);
                setPosts(postData);
                disableLoading();
            })
            .catch((error) => {
                console.log(error);
                disableLoading();
            });
    }, [page]);
    return (
        <div className={cx('wrapper', 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10')}>
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
            <Card className={cx('product-item')} />
        </div>
    );
};

export default Home;
