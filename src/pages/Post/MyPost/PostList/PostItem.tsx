import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import { BsCheckCircleFill } from 'react-icons/bs';

import { useAppDispatch } from '~/store/hooks';
import styles from './PostList.module.scss';
import Post from '~/context/models/Post';
import Image from '~/components/Image';
import { getPostDetail } from '~/store/middlewares/MyPostMiddleware';
import { PostStatus } from '~/config/constants';
import { postApi } from '~/api';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useAuth } from '~/context/AuthContext';
import { useLoading } from '~/context/LoadingContext';
import { ChangeStatusPost } from '~/api/postApi';
import { useToast } from '~/context/ToastContext';

interface Props {
    post: Post;
    fetchData: (isRefresh: boolean) => Promise<void>;
    onRefresh: () => void;
}
const cx = classNames.bind(styles);
const PostItem = ({ post, fetchData, onRefresh }: Props) => {
    const dispatch = useAppDispatch();
    const { enableLoading, disableLoading } = useLoading()!;
    const { showError, showInfo, showSuccess } = useToast()!;
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
                    status: nextChangeStatus(status),
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
    const renderBtnAction = () => {
        let btnAction: JSX.Element | undefined = undefined;

        if (postStatus === PostStatus.DELIVERY) {
            btnAction = (
                <button
                    className={cx('btn-action', `${postStatus.toLowerCase()}`)}
                    onClick={() => handleChangeStatus(postStatus)}
                >
                    DELIVERED
                </button>
            );
        }
        return btnAction;
    };
    return (
        <div className={cx('post-item')} onClick={handleClick}>
            {renderBtnAction()}
            <Image src={post.imageUrl} alt="image" className={cx('image')} />
            <div className={cx('content')}>
                <div className={cx('title')}>{post.title}</div>
                <div className={cx('description')}>
                    <span className={cx('label')}>Description: </span>
                    <span className={cx('text')}>{post.description}</span>
                </div>
                <div className={cx('price')}>
                    <span className={cx('label')}>Price: </span>
                    <span className={cx('text')}>{post.price}.000đ</span>
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
