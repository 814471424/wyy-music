import { defineStore } from 'pinia'

interface MusicData {
    // 音乐的url
    musicUrl: string,
    // // 搜索栏的字段
    // searchtext: string,
    // 歌曲面板信息
    songX: Common.songX,
    // 歌词
    lycs: Array<number | string>,
    // 是否在播放中
    playStatus: boolean,
    // 当前播放时间 
    // Ex为滑块使用的字段
    currentTime: number,
    currentTimeEx: number,
    // 音量
    volume: number,
    // 音乐时长
    duration: number,
}

export const useMainStore = defineStore('main', {
    state: (): MusicData => ({
        musicUrl: '',
        songX: {
            id: '',
            url: '',
            name: ''
        },
        lycs: [],
        playStatus: false,
        currentTime: 0,
        currentTimeEx: 0,
        volume: 0,
        duration: 0,
    }),
    actions: {
        // 更新是否在播放
        setPlayStatus(data: boolean) {
            this.playStatus = data;
        },
        // 更新歌曲信息
        setSongxData(songX: Common.songX) {
            this.songX = songX;
        },
        // 更新歌曲资源
        setUrl(url: string) {
            this.musicUrl = url;
        },
        // 更新歌词
        setLycs(data: []) {
            this.lycs = data
        },
        // 设置当前播放时间
        setCurrentTime(time: number) {
            this.currentTime = time
        },
        setCurrentTimeEx(currentTimeEx: number) {
            this.currentTimeEx = currentTimeEx;
        },
        // 设置音量
        setVolume(volume: number) {
            this.volume = volume
        },
        // 设置时长
        setDuration(duration: number) {
            this.duration = duration;
        }
    }
})