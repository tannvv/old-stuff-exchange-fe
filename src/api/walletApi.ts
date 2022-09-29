import axiosClient from './axiosClient';

const controllerName = 'wallets';
const walletApi = {
    getWalletByUserId: (userId: string) => {
        const url = `${controllerName}/user/${userId}`;
        return axiosClient.get(url);
    },
};

export default walletApi;
