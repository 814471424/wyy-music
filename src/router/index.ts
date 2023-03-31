import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Index.vue'
import Demo from '../views/Demo.vue'
import Download from '../views/Download/Index.vue'
import Unrealized from '../views/Unrealized.vue'
import Discover from '../views/Discover/Index.vue'
import DailySong from '../views/DailySong.vue'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: "/daily_song"
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                // 发现音乐
                path: '/discover',
                component: Discover
            },
            {
                // 播客
                path: '/podcast',
                component: Unrealized
            },
            {
                // 视频
                path: '/video',
                component: Unrealized
            },
            {
                // 关注
                path: '/concern',
                component: Unrealized,
            },
            {
                // 直播
                path: '/broadcast',
                component: Unrealized,
            },
            {
                // 私人FM
                path: '/fm',
                component: Unrealized,
            },
            {
                // 我喜欢的音乐
                path: '/favorite',
                component: Unrealized,
            },
            {
                // 本地与下载
                path: '/download',
                component: Download
            },
            {
                // 最近播放
                path: '/recently_played',
                component: Unrealized
            },
            {
                // 测试用
                path: '/demo',
                component: Demo
            },
            {
                // 每日歌曲
                path: '/daily_song',
                component: DailySong
            }
        ]
    },
    {
        path: '/login',
        component: Login,
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
