import axiosClient from './axiosClient';

interface ProductListParams {
    postId: string;
}

const controllerName = '/products';
const productApi = {
    getList: (postId: string) => {
        return axiosClient.get(`${controllerName}/post/${postId}`);
    },
};

export default productApi;
