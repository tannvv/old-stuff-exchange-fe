import axiosClient from './axiosClient';

interface UpdateAddress {
    userId: string;
    buildingId: string;
}
interface ListUserReq {
    apartmentId?: string;
    pageNumber?: number;
    pageSize?: number;
}
const controllerName = 'users';
const userApi = {
    getId: (id: string) => {
        const url = `/${controllerName}/${id}`;
        return axiosClient.get(url);
    },
    address: (param: UpdateAddress) => {
        const url = `/${controllerName}/address?userId=${param.userId}&buildingId=${param.buildingId}`;
        return axiosClient.put(url);
    },
    getList: (params: ListUserReq) => {
        const url = `/${controllerName}`;
        return axiosClient.get(url, { params: { ...params } });
    },
};

export default userApi;
