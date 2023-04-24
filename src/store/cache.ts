// 用于各个页面的缓存，刷新失效todo!()
import { defineStore } from 'pinia'

interface Cache {
    // 发现音乐-个性推荐-轮播图
    banners?: Common.bannerData[]
    // 发现音乐-个性推荐-推荐歌单
    playlists?: Array<Playlist.playList & { type: number }>
    // 发现音乐-个性推荐-独家放送
    privatecontents?: Array<MV.privatecontentItem>
    // 发现音乐-个性推荐-推荐MV
    personalizedMvs?: Array<MV.mvItem>
    // 发现音乐-歌单
    // 过期时间
    expireTime?: number
}

export const userCacheStore = defineStore('cache', {
    state: (): {
        cache: Cache
    } => {
        let cache: Cache = JSON.parse(localStorage.getItem('cache') ?? '{}');

        if (new Date().getTime() > (cache.expireTime ?? 0)) {
            // 过期操作
            let expireTime = getNextDate()
            let cache = { expireTime: expireTime };
            localStorage.setItem('cache', JSON.stringify(cache))
        }

        return {
            cache
        }
    },
    actions: {
        clean() {
            this.cache = { expireTime: getNextDate() }
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setPlaylists(list: Array<Playlist.playList & { type: number }>) {
            this.cache.playlists = list;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setPrivatecontents(list: Array<MV.privatecontentItem>) {
            this.cache.privatecontents = list;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setPersonalizedMvs(list: Array<MV.mvItem>) {
            this.cache.personalizedMvs = list;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setBanners(list: Common.bannerData[]) {
            this.cache.banners = list;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
    }
})


function getNextDate(): number {
    let day = 1;
    let currentDate = new Date();

    let lastDaysTimes = day * 24 * 60 * 60 * 1000;
    let lastDate = new Date(currentDate.getTime() + lastDaysTimes); //最后得到得时间
    lastDate.setHours(0, 0, 0);//将时间设置到0点0刻。

    return lastDate.getTime()
}