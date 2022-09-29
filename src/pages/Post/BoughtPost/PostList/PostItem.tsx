import React from 'react';
import classNames from 'classnames/bind';
import { BsCheckCircleFill } from 'react-icons/bs';

import { useAppDispatch } from '~/store/hooks';
import styles from './PostList.module.scss';
import Post from '~/context/models/Post';
import Image from '~/components/Image';
import { getPostDetail } from '~/store/middlewares/MyPostMiddleware';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useLoading } from '~/context/LoadingContext';
import { postApi } from '~/api';
import { ChangeStatusPost } from '~/api/postApi';
import { useToast } from '~/context/ToastContext';
import { PostStatus } from '~/config/constants';

interface Props {
    post: Post;
    fetchData: (isRefresh: boolean) => Promise<void>;
    onRefresh: () => void;
}
const cx = classNames.bind(styles);
const PostItem = ({ post, fetchData, onRefresh }: Props) => {
    const dispatch = useAppDispatch();
    const { enableLoading, disableLoading } = useLoading()!;
    const { showError, showSuccess, showInfo } = useToast()!;

    const postStatus = post.status;
    const handleClick = () => {
        dispatch(getPostDetail(post));
    };
    const handleChangeStatus = (status: string) => {
        confirmDialog({
            message: 'Are you sure to pay this post?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                enableLoading();
                const dataRequest: ChangeStatusPost = {
                    postId: post.id,
                    status: status,
                };
                postApi
                    .changeStatus(dataRequest)
                    .then((response) => {
                        setTimeout(() => {
                            fetchData(true);
                        }, 500);
                        showSuccess({ detail: `${postStatus} post success` });
                    })
                    .catch((error) => {
                        showError({ detail: `${postStatus} post failed. ${error}` });
                    })
                    .finally(() => {
                        disableLoading();
                    });
            },
            reject: () => {
                showInfo({ detail: 'You have rejected.' });
            },
        });
    };
    const nextChangeStatus = (currentStatus: string) => {
        let nextStatus = '';
        if (currentStatus === PostStatus.DELIVERY) nextStatus = PostStatus.DELIVERED;
        return nextStatus;
    };
    return (
        <div className={cx('post-item')} onClick={handleClick}>
            <Image src={post.imageUrl} alt="image" className={cx('image', 'max-h-[100px]')} />
            <div className={cx('content')}>
                {postStatus === PostStatus.DELIVERED ? (
                    <div className={cx('change-status')}>
                        <button
                            className={cx('btn-action', 'accomplished')}
                            onClick={() => handleChangeStatus(PostStatus.ACCOMPLISHED)}
                        >
                            RECEIVED
                        </button>
                        <button
                            className={cx('btn-action', 'failure')}
                            onClick={() => handleChangeStatus(PostStatus.FAILURE)}
                        >
                            NOT YET RECEIVED
                        </button>
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('title')}>{post.title}</div>
                <div className={cx('description')}>
                    <span className={cx('label')}>Description: </span>
                    <span className={cx('text')}>{post.description}</span>
                </div>
                <div className={cx('price')}>
                    <span className={cx('label')}>Price: </span>
                    <span className={cx('text')}>{post.price}</span>
                </div>
                <div className={cx('status')}>
                    <span className={cx('label')}>Status: </span>
                    <span className={cx('value', `${post.status.toLowerCase()}`)}>{post.status}</span>
                </div>
                {post.userBoughtObject?.fullName ? (
                    <div className={cx('user-bought')}>
                        <span className={cx('name')}>{post.userBoughtObject?.fullName}</span>
                        <BsCheckCircleFill className={cx('icon-check')} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default PostItem;
