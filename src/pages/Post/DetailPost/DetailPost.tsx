import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';

import styles from './DetailPost.module.scss';
import { useLoading } from '~/context/LoadingContext';
import { postApi } from '~/api';
import { Post } from '~/context/models';
import { useToast } from '~/context/ToastContext';
import Image from '~/components/Image';
import moment from 'moment';
import ProductItem from './ProductItem';
import ProductList from './ProductList';
import { storage } from '~/firebase';
import ImageCarousel from './ImageCarousel';
import { Payment } from './Payment';

const cx = classNames.bind(styles);
const DetailPost = () => {
    const [searchParams] = useSearchParams();
    const [post, setPost] = useState<Post | null>(null);
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);
    const [isPayment, setIsPayment] = useState<boolean>(false);
    const { enableLoading, disableLoading } = useLoading()!;
    const { showError } = useToast()!;

    const navigate = useNavigate();

    const handleChat = () => {
        if (post?.author?.id) navigate(`/chat?userId=${post?.author.id}`);
    };
    useEffect(() => {
        const postId = searchParams.get('id');
        enableLoading();
        if (postId) {
            postApi
                .getById(postId)
                .then((response) => {
                    setPost(new Post(response.data));
                })
                .catch((error) => {
                    showError({ detail: 'Api get post error' });
                })
                .finally(() => {
                    disableLoading();
                });
            const listRef = ref(storage, `posts/${postId}`);
            listAll(listRef).then((folderRef) => {
                folderRef.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((url) => {
                        setImagesUrl((prev) => [...prev, url]);
                    });
                });
            });
        }
    }, []);
    const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
    const createdAt = moment(post?.createdAt).format(DATE_TIME_FORMAT);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'w-[100%] md:w-[80%] lg:grid lg:grid-cols-5')}>
                <div className={cx('post', 'lg:col-span-3')}>
                    <div className={cx('carousel')}>
                        <ImageCarousel imagesUrl={imagesUrl} />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>{post?.title}</div>
                        <div className={cx('price')}>
                            <div className={cx('origin')}>
                                <span className={cx('label')}>Origin price: </span>
                                <span className={cx('value')}>{(post?.price ?? 0) + (post?.price ?? 0) / 10}.000đ</span>
                            </div>
                            <div className={cx('promotion')}>
                                <span className={cx('label')}>Price: </span>
                                <span className={cx('value')}>{post?.price}.000đ</span>
                            </div>
                        </div>
                        <p className={cx('created-at')}>
                            <span className={cx('label')}>Created at: </span>
                            <span className={cx('value')}>{createdAt}</span>
                        </p>
                        <div className={cx('location')}>
                            <span className={cx('icon')}>
                                <GoLocation />
                            </span>
                            <span className={cx('building')}>Building: {post?.author?.building?.name}</span>
                        </div>
                    </div>
                    <div className={cx('author')}>
                        <Image src={post?.author?.imageUrl} className={cx('img', 'rounded-[50%]')} />
                        <div className={cx('info')}>
                            <span className={cx('name')}>{post?.author?.fullName}</span>
                            <button className={cx('btn-chat')} onClick={handleChat}>
                                <span>Chat now</span> <BsFillChatDotsFill />
                            </button>
                        </div>
                    </div>
                    <div className={cx('contact')}>
                        <span className={cx('label')}>Phone number:</span>
                        <span className={cx('value')}>{post?.author?.phone}</span>
                    </div>
                    <button className={cx('btn-pay', 'xl:absolute')} onClick={() => setIsPayment(!isPayment)}>
                        Payment orders
                        <span>
                            <MdPayment />
                        </span>
                    </button>
                </div>
                <div className={cx('products', 'col-span-2')}>
                    {isPayment && post ? (
                        <Payment setIsPayment={setIsPayment} post={post} />
                    ) : (
                        <>
                            <div className={cx('header')}>
                                <span className={cx('title')}>PRODUCTS: </span>
                            </div>
                            <ProductList products={post?.products ?? []} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPost;
