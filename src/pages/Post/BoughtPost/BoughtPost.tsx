import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';

import styles from './BoughtPost.module.scss';
import { useAuth } from '~/context/AuthContext';
import UseDebounce from '~/hooks/useDebounce';
import Post from '~/context/models/Post';
import postApi, { PostListUserBoughtParams } from '~/api/postApi';
import { selectStylesDefault } from '~/utils/selectStyles';
import { POST_STATUS_OPTIONS_BOUGHT } from '~/config/constants/PostStatusOption';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingInside } from '~/components/LoadingInside';
import { PostList } from './PostList';

const cx = classNames.bind(styles);
const BoughtPost = () => {
    // const [searchTerm, setSearchTerm] = useState('');
    // const [searchTermApi, setSearchTermApi] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useAuth()!;
    const PAGE_SIZE = 10;

    const fetchData = async (isRefresh: boolean = false) => {
        if (isRefresh) onRefresh();
        const params: PostListUserBoughtParams = {
            status: selectedStatus,
            page: isRefresh ? 1 : currentPage,
            pageSize: PAGE_SIZE,
            userId: user?.id,
        };
        postApi.getUserBoughtList(params).then((response) => {
            const postData: Post[] = response?.data?.map((po: any) => {
                return new Post(po);
            });
            if (postData.length < 20) setHasMore(false);
            setCurrentPage((prev) => prev + 1);
            setPosts((prev) => [...prev, ...postData]);
        });
    };

    const onRefresh = () => {
        setPosts([]);
        setCurrentPage(1);
        setHasMore(true);
    };

    // useEffect(() => {
    //     setSearchTermApi(debounceValue);
    // }, [debounceValue]);

    useEffect(() => {
        fetchData();
    }, [selectedStatus]);

    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    //     onRefresh();
    // };

    const handleChangeStatus = (e: any) => {
        if (e) {
            setSelectedStatus(e.value);
        } else {
            setSelectedStatus('');
        }
        onRefresh();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'w-[100%] md:w-[80%] px-[40px]')}>
                <div className={cx('header')}>
                    <div className={cx('form-group')}>
                        <Select
                            id="select-status"
                            className="w-full"
                            styles={selectStylesDefault}
                            placeholder="Select status"
                            options={POST_STATUS_OPTIONS_BOUGHT}
                            onChange={handleChangeStatus}
                            isClearable={true}
                        />
                    </div>
                </div>
                <div className={cx('content', 'lg:px-[8rem]')}>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchData}
                        height={'70vh'}
                        hasMore={hasMore}
                        loader={
                            <div className={cx('cover-loading')}>
                                <LoadingInside className={cx('loading')} />
                            </div>
                        }
                        endMessage={
                            <p className={cx('end-message')}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <PostList posts={posts} fetchData={fetchData} onRefresh={onRefresh} />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default BoughtPost;
