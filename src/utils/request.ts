import axios from 'axios'

// post请求头
axios.defaults.headers["Content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 设置超时
axios.defaults.timeout = 15000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(JSON.stringify(error));
    }
)

export default axios