import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit';

import Post from '~/context/models/Post';
import MyPostSlice from './reducers/MyPostReducer';

export const store = configureStore({
    reducer: {
        myPostReducer: MyPostSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
