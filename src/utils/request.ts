import axios from 'axios'
import { useUserStore } from '../store/user'

// 请求地址
axios.defaults.baseURL = import.meta.env.VUE_APP_BASE_API
// post请求头
// axios.defaults.headers["Content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 设置超时
axios.defaults.timeout = 15000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('cookie') && localStorage.getItem('cookie') != '') {
            if (config.params) {
                config.params['cookie'] = localStorage.getItem('cookie') ?? ''
            } else {
                config.params = { 'cookie': localStorage.getItem('cookie') ?? '' }
            }
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
            if ((response.data.code ?? 200) == 302) {
                let userStore = useUserStore();
                userStore.cleanUser()
            }
            return Promise.resolve(response.data);
        }
        // else if (response.status == 302) {
        //     let userStore = useUserStore();
        //     userStore.cleanUser()
        // }
        return Promise.reject(response.data);
    },
    error => {
        // if (error.response && error.response.status == 301) {
        //     let userStore = useUserStore();
        //     userStore.cleanUser()
        // }
        return Promise.reject(error.response ? error.response.data : {});
    }
)

export default axios