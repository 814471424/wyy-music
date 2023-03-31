import axios from 'axios'

// 请求地址
axios.defaults.baseURL = import.meta.env.VUE_APP_BASE_API
// post请求头
axios.defaults.headers["Content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 设置超时
axios.defaults.timeout = 15000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        if (config.params && localStorage.getItem('cookie')) {
            config.params['cookie'] = localStorage.getItem('cookie') ?? ''
        } else {
            config.params = { 'cookie': localStorage.getItem('cookie') ?? '' }
        }

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
        console.log(error);
    }
)

export default axios