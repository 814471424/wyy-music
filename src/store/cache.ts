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

    // 目前只缓存全部歌单的分类的数据
    // 发现音乐-歌单-歌单推荐封面
    songListHighquality?: Playlist.playListDetail | null
    // 发现音乐-歌单-歌单列表
    songList?: Array<Playlist.playList & { type: number }>
    // 发现音乐-歌单-歌单的分类
    songListAll?: Playlist.Catlist | null
    songListSub?: Array<Playlist.Catlist>
    // 发现音乐-歌单-热门歌单分类
    songListHotTags?: Array<Playlist.Catlist>
    // 发现音乐-歌单-总数
    songListTotal?: number

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
        setPlaylists(data: Array<Playlist.playList & { type: number }>) {
            this.cache.playlists = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setPrivatecontents(data: Array<MV.privatecontentItem>) {
            this.cache.privatecontents = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setPersonalizedMvs(data: Array<MV.mvItem>) {
            this.cache.personalizedMvs = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setBanners(data: Common.bannerData[]) {
            this.cache.banners = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongLists(data: Array<Playlist.playList & { type: number }>) {
            this.cache.songList = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongListAll(data: Playlist.Catlist | null) {
            this.cache.songListAll = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongListSub(data: Array<Playlist.Catlist>) {
            this.cache.songListSub = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongListHotTags(data: Array<Playlist.Catlist>) {
            this.cache.songListHotTags = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongListHighquality(data: Playlist.playListDetail | null) {
            this.cache.songListHighquality = data;
            localStorage.setItem('cache', JSON.stringify(this.cache))
        },
        setSongListTotal(data: number) {
            this.cache.songListTotal = data;
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