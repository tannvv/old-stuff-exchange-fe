import axiosClient from './axiosClient';

export interface apartmentParams {
    isBuildingsNull?: boolean;
}
const controllerName = 'apartments';
const apartmentApi = {
    getAll: (params: apartmentParams) => {
        const url = `${controllerName}`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
};

export default apartmentApi;
