import axios, { AxiosRequestConfig } from 'axios';

import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    // config request
    const token = localStorage.getItem('access_token');
    config.headers!.Authorization = `Bearer ${token}`;
    config.timeout = 100000;

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
export const domainName = process.env.REACT_APP_DOMAIN;
