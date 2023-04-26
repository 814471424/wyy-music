// 搜索相关数据 
declare namespace Search {
    /**
     * 搜索的类型(可能用于其他地方)
     * 1: 单曲
     * 10: 专辑
     * 100: 歌手
     * 1000: 歌单
     * 1002: 用户
     * 1004: MV
     * 1006: 歌词
     * 1009: 电台
     * 1014: 视频
     * 1018: 综合
     * 2000: 声音
     */
    export enum searchType {
        song = 1,
        album = 10,
        artist = 100,
        playlist = 1000,
        userprofile = 1002,
        mv = 1004,
        lyric = 1006,
        djRadio = 1009,
        video = 1014,
        combined = 1018,
        sound = 2000,
    }

    // 搜索的歌曲
    export interface song {
        id: number,
        name: string,
        artists: Common.artist[],
        album: Common.album,
        // 歌曲时长
        duration: number,
    }

    // 搜索的歌手
    export interface artist extends Common.artist {
        // 歌手图片
        picUrl?: string
        img1v1Url?: string
        // 翻译名
        transNames?: Array<string>
        trans?: string,
        // 别名
        alias?: Array<string>
    }

    // 专辑
    export interface album extends Common.album {
        artist: artist
        publishTime?: number
    }

    // 视频
    export interface video {
        coverUrl: string
        title: string
        creator: { userId: number, userName: string }[]
        vid: string
        // 0为mv, 1为其他
        type: number
        playTime?: number
        durationms?: number
    }

    // 歌单
    export interface playlist extends Playlist.playListDetail { }
}
