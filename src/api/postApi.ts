import axiosClient from './axiosClient';

interface PostListParams {
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
};
export default postApi;
