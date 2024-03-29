import axios from 'axios';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosClient.interceptors.request.use(async (config) => config, (error) => { return Promise.reject(error) });

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;