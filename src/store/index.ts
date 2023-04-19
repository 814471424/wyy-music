import { defineStore } from 'pinia'

interface MusicData {
    // 音乐的url
    musicUrl: string,
    // // 搜索栏的字段
    // searchtext: string,
    // 歌曲面板信息
    songX: Common.songX | null,
    // 歌词
    lycs: Array<number | string>,
    lyc: string,
    tlyric: string,
    romalrc: string,
    // 是否在播放中
    playStatus: boolean,
    // 当前播放时间 
    // currentTime主要显示用
    // currentTimeEx为滑块使用的字段
    currentTime: number,
    currentTimeEx: number,
    // 音量
    volume: number,
    // 音乐时长
    duration: number,
}

export const useMainStore = defineStore('main', {
    state: (): MusicData => {
        let song = JSON.parse(localStorage.getItem('song') ?? '{}');

        return {
            musicUrl: song['musicUrl'] ?? '',
            songX: song['songX'] ?? null,
            lycs: song['lycs'] ?? [],
            lyc: song['lyc'] ?? '',
            tlyric: song['tlyric'] ?? '',
            romalrc: song['romalrc'] ?? '',
            playStatus: false,
            currentTime: 0,
            currentTimeEx: 0,
            volume: 0,
            duration: 0,
        }
    },
    actions: {
        // 更新是否在播放
        setPlayStatus(data: boolean) {
            this.playStatus = data;
        },
        // 更新歌曲信息
        setSongxData(songX: Common.songX) {
            this.songX = songX;
            this.saveToLocal()
        },
        // 更新歌曲资源
        setUrl(url: string) {
            this.musicUrl = url;
            this.saveToLocal()
        },
        // 更新歌词
        setLycs(data: Array<number | string>) {
            this.lycs = data
            this.saveToLocal()
        },
        setLyc(data: string, tlyric = '', romalrc = '') {
            this.lyc = data
            this.tlyric = tlyric
            this.romalrc = romalrc
            this.saveToLocal()
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
        },
        // 正在播放歌曲存放到缓存里
        saveToLocal() {
            localStorage.setItem('song', JSON.stringify({
                musicUrl: this.musicUrl,
                songX: this.songX,
                lycs: this.lycs,
                lyc: this.lyc,
                tlyric: this.tlyric,
                romalrc: this.romalrc,
                playStatus: this.playStatus,
                currentTime: this.currentTime,
                currentTimeEx: this.currentTimeEx,
                volume: this.volume,
                duration: this.duration,
            }))
        },
        clear() {
            this.musicUrl = '';
            this.songX = null;
            this.lycs = [];
            this.lyc = '';
            this.tlyric = '';
            this.romalrc = '';
            this.playStatus = false;
            this.currentTime = 0;
            this.currentTimeEx = 0;
            this.duration = 0;
            this.saveToLocal()
        }
    }
})