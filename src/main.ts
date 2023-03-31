import { createApp } from "vue";
import App from "./App.vue";
import Router from './router/index'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import "element-plus/dist/index.css"
import "./styles.css";
import './assets/iconfont/iconfont.css'
// import './assets/yunti.css'

createApp(App).use(ElementPlus).use(Router).use(createPinia()).mount("#app");
