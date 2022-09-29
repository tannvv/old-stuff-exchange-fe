import { getPostDetail } from '~/store/middlewares/MyPostMiddleware';
import { createSlice } from '@reduxjs/toolkit';
import Post from '~/context/models/Post';

const initialState = {
    posts: [],
    searchTerm: '',
    selectedCategoryId: '',
    currentPage: 1,
    isLoading: false,
};

const MyPostSlice = createSlice({
    name: 'myPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostDetail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.isLoading = false;
            });
    },
});

export default MyPostSlice;
