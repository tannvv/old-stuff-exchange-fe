import { RootState } from './../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStorage, ref, listAll, ListResult } from 'firebase/storage';

import { storage } from '~/firebase';
import Post from '~/context/models/Post';
import { productApi } from '~/api';

export const getPostDetail = createAsyncThunk('myPost/getPostDetail', async (post: Post, { getState }) => {
    const promises = [];

    const getProduct = productApi.getList(post.id);
    const listRef = ref(storage, `posts/${post.id}`);
    const getImagesFirebase = listAll(listRef);

    promises.push(getProduct);
    promises.push(getImagesFirebase);

    await Promise.all(promises).then(([products, images]) => {
        (images as ListResult).items.forEach((itemRef) => {});
    });

    return JSON.stringify(post);
});
