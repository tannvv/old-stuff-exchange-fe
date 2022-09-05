import axiosClient from './axiosClient';

const controllerName = 'categories';
const categoryApi = {
    getAll: () => {
        const url = `/${controllerName}`;
        return axiosClient.get(url);
    },
};

export default categoryApi;
