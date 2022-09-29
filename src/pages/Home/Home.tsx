import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { postApi } from '~/api';
import { PostListParams } from '~/api/postApi';
import { Card } from '~/components/Card';
import { LoadingInside } from '~/components/LoadingInside';
import { useAuth } from '~/context/AuthContext';
import Post from '~/context/models/Post';
import { useToast } from '~/context/ToastContext';
import styles from './Home.module.scss';
import { PostFilter } from './PostFilter';
import { PostList } from './PostList';

const cx = classNames.bind(styles);
const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');

    const { user } = useAuth()!;
    const { showError } = useToast()!;
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleScroll = (e: Event) => {
        const scrollHeight = document.documentElement.scrollHeight;
        const spaceWithTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        if (windowHeight + spaceWithTop + 1 > scrollHeight) {
            setPage((prev) => prev + 1);
        }
    };

    const refresh = () => {
        setPosts([]);
        setPage(1);
        setLoading(true);
    };

    const loadPosts = async (params: PostListParams) => {
        setLoading(true);
        postApi
            .getList({ ...params })
            .then((response) => {
                let postData: Post[] = response.data?.map((post: any) => new Post(post));
                setPosts((prev) => [...prev, ...postData]);
                setLoading(false);
            })
            .catch((error) => {
                showError({ detail: error ?? 'Post api is failed' });
                setLoading(false);
            });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        loadPosts({
            page: page,
            pageSize: 12,
            status: 'ACTIVE',
            filterWith: 'TITLE',
            filterValue: searchValue,
            categoryId: categoryValue,
            exceptAuthorId: user?.id,
            apartmentId: user?.building?.apartmentId ?? '',
        });
    }, [page, searchValue, categoryValue]);
    return (
        <div className={cx('wrapper', 'grid grid-cols-5')}>
            <PostFilter
                className={cx('hidden col-span-1 lg:block')}
                setSearchValue={setSearchValue}
                setCategoryValue={setCategoryValue}
                onRefresh={refresh}
            />
            <PostList posts={posts} isLoading={isLoading} className={cx('col-span-4')} />
        </div>
    );
};

export default Home;
