import { createApp } from "vue";
import App from "./App.vue";
import Router from './router/index'
import ElementPlus from 'element-plus'
import { Tab, Tabs, Swipe, SwipeItem, Pagination } from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import "element-plus/dist/index.css"
import "./styles.css";
import loadingSmall from './assets/loading_small.gif'
import miku404 from './assets/miku404.png'
import './assets/iconfont/iconfont.css'
// import './assets/yunti.css'
import Theme from './utils/theme'

// 初始化主题
Theme.init()

createApp(App)
    .use(ElementPlus)
    .use(Tab)
    .use(Tabs)
    .use(Swipe)
    .use(SwipeItem)
    .use(Pagination)
    .use(Router)
    .use(createPinia())
    .use(VueLazyload, {
        preLoad: 1,
        loading: loadingSmall,
        error: miku404,
        attempt: 1,
        lazyComponent: true,
        // listenEvents: ['scroll', 'touchmove', 'mousewheel']
    })
    .mount("#app");
