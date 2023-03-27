// 音乐播放器及歌词相关的全局
import { createStore } from 'vuex'

type MusicData = {
    // 音乐的url 或者 base64的数据(本地数据)
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
}

// 创建仓库和导出
export default createStore<MusicData>({
    state: {
        musicUrl: '',
        // searchtext: '',
        songX: {
            id: '',
            url: '',
            sname: '',
            name: ''
        },
        lycs: [],
    },
    mutations: {
        // 更新歌曲信息
        updateSongxData(state, data: { id: string | number, url: string, sname: string, name: string }) {
            state.songX.id = data.id;
            state.songX.url = data.url;
            state.songX.sname = data.sname;
            state.songX.name = data.name;
        },
        // 更新歌曲资源
        updateUrl(state, url: string) {
            state.musicUrl = url;
        },
        // 更新歌词
        updateLyc(state, data: []) {
            state.lycs = data
        }
    }
})

export type { MusicData }