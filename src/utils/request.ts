import axios from 'axios'
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus'

// 请求地址
axios.defaults.baseURL = import.meta.env.VUE_APP_BASE_API
// post请求头
// axios.defaults.headers["Content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// 设置超时
axios.defaults.timeout = 10000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        // 去掉nginx那边需要设置 proxy_cookie_path / "/; secure=false; SameSite=None";;
        if (localStorage.getItem('cookie') && localStorage.getItem('cookie') != '') {
            // let cookie = (localStorage.getItem('cookie') ?? '').split(';;').filter(v => v.indexOf('MUSIC_U') >= 0).join(';;');
            let cookie = localStorage.getItem('cookie') ?? '';
            if (cookie.length > 0) {
                if (config.params) {
                    config.params['cookie'] = cookie
                } else {
                    config.params = { 'cookie': cookie }
                }
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
            if (response.data.code == 302) {
                let userStore = useUserStore();
                userStore.cleanUser()
            }
            if (response.data.code == -460) {
                ElMessage.error(response.data.message)
                // let userStore = useUserStore();
                // userStore.cleanUser()
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