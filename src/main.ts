import { createApp } from "vue";
import App from "./App.vue";
import Router from './router/index'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import "element-plus/dist/index.css"
import "./styles.css";
import loadimage from './assets/loading.png'
import './assets/iconfont/iconfont.css'
// import './assets/yunti.css'
import Theme from './utils/theme'

// 初始化主题
Theme.init()

createApp(App)
    .use(ElementPlus)
    .use(Router)
    .use(createPinia())
    .use(VueLazyload, {
        preLoad: 1.3,
        loading: loadimage,
        attempt: 1
    })
    .mount("#app");
