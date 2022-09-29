import axiosClient from './axiosClient';

export interface TransactionUserParams {
    userId: string;
    type: string;
    page: number;
    pageSize: number;
}

const controllerName = 'transactions';
const transactionApi = {
    getByUserId: (params: TransactionUserParams) => {
        const url = `${controllerName}/user`;
        return axiosClient.get(url, {
            params: { ...params },
        });
    },
};

export default transactionApi;
