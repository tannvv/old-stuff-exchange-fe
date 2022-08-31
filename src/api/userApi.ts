import axiosClient from './axiosClient';

const controllerName = 'users';
const userApi = {
    getId: (id: string) => {
        const url = `/${controllerName}/${id}`;
        return axiosClient.get(url);
    },
};

export default userApi;
