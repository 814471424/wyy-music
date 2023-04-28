// 用户登录信息的全局
import { defineStore } from 'pinia'

interface UserData {
    // 用户或者游客的cookie
    cookie: string | null
    // 用户基础信息
    profile: Common.profileInfo | null
    // 用户的所有歌单
    userPlayList: Playlist.playListDetail[]
}

export const useUserStore = defineStore('user', {
    state: (): UserData => {
        let userCache = localStorage.getItem('profile')
        let user = userCache ? JSON.parse(userCache) : null
        let cookie = localStorage.getItem('cookie');
        let userPlayList = JSON.parse(localStorage.getItem('userPlayList') ?? '[]') ?? []

        return {
            cookie: cookie,
            profile: user,
            userPlayList: userPlayList
        }
    },
    actions: {
        setUserInfo(profile: Common.profileInfo | null) {
            this.profile = profile

            localStorage.setItem('profile', JSON.stringify(this.profile))
        },
        setCookie(cookie: string) {
            this.cookie = cookie

            localStorage.setItem('cookie', cookie);
        },
        setUserPlayList(playList: Playlist.playListDetail[]) {
            this.userPlayList = playList

            localStorage.setItem('userPlayList', JSON.stringify(playList));
        },
        // 清除掉用户的数据
        cleanUser() {
            this.profile = null
            this.cookie = ''
            this.userPlayList = []

            localStorage.removeItem('profile')
            localStorage.removeItem('cookie')
            localStorage.removeItem('userPlayList')
        },
        // 重新加载用户数据
        reLoad() {
            // userPlayList不在这个页面触发
            let userCache = localStorage.getItem('profile')
            let user = userCache ? JSON.parse(userCache) : null
            let cookie = localStorage.getItem('cookie') ?? '';

            this.profile = user
            this.cookie = cookie
        }
    },
})