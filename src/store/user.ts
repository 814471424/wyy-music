// 用户登录信息的全局
import { defineStore } from 'pinia'

interface UserData {
    // 头像
    avatarUrl: string
    // 昵称
    nickname: string
    cookie: string
}

export const useUserStore = defineStore('user', {
    state: (): UserData => {
        let user = JSON.parse(localStorage.getItem('user') ?? "{}");
        let cookie = localStorage.getItem('cookie') ?? '';

        return {
            avatarUrl: user['avatarUrl'] ?? '',
            nickname: user['nickname'] ?? '',
            cookie: cookie
        }
    },
    actions: {
        setUserInfo(avatarUrl: string, nickname: string) {
            this.avatarUrl = avatarUrl
            this.nickname = nickname

            localStorage.setItem('user', JSON.stringify({ avatarUrl: avatarUrl, nickname: nickname }))
        },
        setCookie(cookie: string) {
            this.cookie = cookie

            localStorage.setItem('cookie', cookie);
        },
        // 清除掉用户的数据
        cleanUser() {
            this.avatarUrl = '';
            this.nickname = '';
            this.cookie = ''

            localStorage.removeItem('cookie')
            localStorage.removeItem('user')
        }
    },
})