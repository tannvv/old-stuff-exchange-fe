import axiosClient from './axiosClient';

interface authFirebaseModel {
    token: string;
}
const controllerName = 'authorizes';
const authorizeApi = {
    firebase: (data: authFirebaseModel) => {
        const url = `/${controllerName}/firebase`;
        return axiosClient.post(url, data);
    },
};

export default authorizeApi;
