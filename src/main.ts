import { createApp } from "vue";
import App from "./App.vue";
import Router from './router/index'
import ElementPlus from 'element-plus'
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
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
    .use(Tab)
    .use(Tabs)
    .use(Router)
    .use(createPinia())
    .use(VueLazyload, {
        preLoad: 1.3,
        loading: loadimage,
        attempt: 1,
        lazyComponent: false
    })
    .mount("#app");
