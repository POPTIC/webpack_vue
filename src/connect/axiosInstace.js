import axios from 'axios';

const instance = axios.create({
    timeout: 5000,
})

instance.interceptors.request.use(
    config => {

        // 在这里通过本地存储或状态管理获取 token
        const token = localStorage.getItem('token');
        // 如果存在 token,在请求头中携带
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default instance;