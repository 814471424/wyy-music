// 用户登录信息的全局
import { defineStore } from 'pinia'

interface UserData {
    cookie: string
    profile: Common.profileInfo | null
}

export const useUserStore = defineStore('user', {
    state: (): UserData => {
        let userCache = localStorage.getItem('profile')
        let user = userCache ? JSON.parse(userCache) : null
        let cookie = localStorage.getItem('cookie') ?? '';

        return {
            cookie: cookie,
            profile: user
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
        // 清除掉用户的数据
        cleanUser() {
            this.profile = null
            this.cookie = ''

            localStorage.removeItem('profile')
            localStorage.removeItem('cookie')
        },
        // 重新加载用户数据
        reLoad() {
            let userCache = localStorage.getItem('profile')
            let user = userCache ? JSON.parse(userCache) : null
            let cookie = localStorage.getItem('cookie') ?? '';

            this.profile = user
            this.cookie = cookie
        }
    },
})