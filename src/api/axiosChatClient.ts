import axios from 'axios';

import queryString from 'query-string';

export const hostSocketChat = 'http://localhost:5055';
export const sendMessageRoute = `${hostSocketChat}/api/messages/add-msg`;
export const getAllMessageRoute = `${hostSocketChat}/api/messages/get-msg`;

const axiosChatClient = axios.create({
    baseURL: hostSocketChat,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosChatClient;
