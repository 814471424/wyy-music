import { createApp } from "vue";
import "./styles.css";
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import App from "./App.vue";
import Router from './router/index'
// import './assets/iconfont/iconfont.css'
import './assets/yunti.css'
import musicStore from './store/music'

createApp(App).use(ElementPlus).use(Router).use(musicStore).mount("#app");
