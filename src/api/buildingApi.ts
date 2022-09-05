import axiosClient from './axiosClient';

interface BuildingParams {
    apartmentId?: string;
}
const controllerName = 'buildings';
const buildingApi = {
    getList: (params: BuildingParams) => {
        const url = `/${controllerName}`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
};

export default buildingApi;
