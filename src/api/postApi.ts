import axiosClient from './axiosClient';
import { CreatePostReq } from '~/api/interfaces';

export interface PostListUserParams {
    userId?: string;
    status?: string;
    title?: string;
    page?: number;
    pageSize?: number;
    isOrderLastUpdate?: boolean;
}
export interface PostListUserBoughtParams {
    userId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
}
export interface PostListParams {
    exceptAuthorId?: string;
    apartmentId?: string;
    categoryId?: string;
    status?: string;
    filterWith?: string;
    filterValue?: string;
    sortBy?: string;
    sortType?: string;
    page?: number;
    pageSize?: number;
}

export interface ChangeStatusPost {
    postId?: string;
    status?: string;
    walletType?: string;
}
const controllerName = 'posts';
const postApi = {
    getList: (params: PostListParams) => {
        const url = `/${controllerName}`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
    getById: (id: string) => {
        const url = `/${controllerName}/${id}`;
        return axiosClient.get(url);
    },
    getUserList: (params: PostListUserParams) => {
        const url = `/${controllerName}/user`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
    getUserBoughtList: (params: PostListUserBoughtParams) => {
        const url = `/${controllerName}/userBought`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
    create: (data: CreatePostReq) => {
        const url = `/${controllerName}`;
        return axiosClient.post(url, data);
    },
    changeStatus: (data: ChangeStatusPost) => {
        const url = `/${controllerName}/status`;
        return axiosClient.put(url, data);
    },
};
export default postApi;
