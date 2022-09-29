import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';

import styles from './MyPost.module.scss';
import {} from '~/utils/selectStyles';
import { selectStylesDefault } from '~/utils/selectStyles';
import { PostList } from './PostList';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '~/context/models/Post';
import { LoadingInside } from '~/components/LoadingInside';
import postApi, { PostListUserParams } from '~/api/postApi';
import { useAuth } from '~/context/AuthContext';
import STATUS_OPTIONS from '~/config/constants/PostStatusOption';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
const MyPost = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermApi, setSearchTermApi] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const debounceValue = useDebounce(searchTerm, 500);
    const { user } = useAuth()!;
    const PAGE_SIZE = 20;

    const fetchData = async (isRefresh: boolean = false) => {
        if (isRefresh) onRefresh();
        const params: PostListUserParams = {
            status: selectedStatus,
            title: searchTermApi.trim(),
            page: isRefresh ? 1 : currentPage,
            pageSize: PAGE_SIZE,
            userId: user?.id,
        };
        postApi.getUserList(params).then((response) => {
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

    useEffect(() => {
        setSearchTermApi(debounceValue);
    }, [debounceValue]);

    useEffect(() => {
        fetchData();
    }, [searchTermApi, selectedStatus]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onRefresh();
    };

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
            <div className={cx('inner', 'md:w-[80%]')}>
                <div className={cx('header', 'md:flex lg:justify-start lg:px-[100px]')}>
                    <div className={cx('form-group')}>
                        {/* <label htmlFor="search-post" className={cx('label')}>
                            Search
                        </label> */}
                        <input
                            type="text"
                            name="searchTerm"
                            id="search-post"
                            className={cx('input-search')}
                            placeholder="Search posts"
                            onChange={handleSearch}
                            spellCheck={false}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        {/* <label htmlFor="select-status" className={cx('label')}>
                            Select status
                        </label> */}
                        <Select
                            id="select-status"
                            className="w-full"
                            styles={selectStylesDefault}
                            placeholder="Select status"
                            options={STATUS_OPTIONS}
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

export default MyPost;
