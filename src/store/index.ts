import { defineStore } from 'pinia'

interface MusicData {
    // 音乐的url
    musicUrl: string,
    // // 搜索栏的字段
    // searchtext: string,
    songX: {
        // 歌曲的id
        id: string | number,
        // 歌曲图片
        url: string,
        sname: string,
        name: string
    },
    // 歌词
    lycs: Array<number | string>,
    // 是否在播放中
    playStatus: boolean,
}

export const useMainStore = defineStore('main', {
    state: (): MusicData => ({
        musicUrl: '',
        // searchtext: '',
        songX: {
            id: '',
            url: '',
            sname: '',
            name: ''
        },
        lycs: [],
        playStatus: false,
    }),
    actions: {
        // 更新是否在播放
        setPlayStatus(data: boolean) {
            this.playStatus = data;
        },
        // 更新歌曲信息
        setSongxData(data: { id: string | number, url: string, sname: string, name: string }) {
            this.songX.id = data.id;
            this.songX.url = data.url;
            this.songX.sname = data.sname;
            this.songX.name = data.name;
        },
        // 更新歌曲资源
        setUrl(url: string) {
            this.musicUrl = url;
        },
        // 更新歌词
        setLycs(data: []) {
            this.lycs = data
        }
    }
})