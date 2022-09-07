import axiosClient from './axiosClient';

export interface messageParams {
    senderId: string;
    receiverId: string;
    page?: number;
    pageSize?: number;
    isFull?: boolean;
}

export interface createMessageData {
    senderId: string;
    receiverId: string;
    content: string;
}
const controllerName = 'messages';
const messageApi = {
    getAll: (params: messageParams) => {
        const url = `${controllerName}`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
    create: (data: createMessageData) => {
        const url = `${controllerName}`;
        return axiosClient.post(url, data);
    },
};

export default messageApi;
