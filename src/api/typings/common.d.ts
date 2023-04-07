declare namespace Common {
    // 轮播图
    export interface bannerData {
        imageUrl: string,
        typeTitle: string,
        targetId: number,
        targetType: number,
        titleColor: string
    }

    // 音乐连接
    export interface SongUrl {
        // 音乐id
        id: string,
        // 音乐资源连接
        url: string,
        code: number,
        // 音乐大小
        size: number,
        // 时间
        time: number
    }

    export interface songX extends Playlist.dailySong {
        // 本地音乐还是线上音乐, null为other
        // local: 本地
        // daily_song: 每日推荐
        // other: 其他
        // playlist: 歌单
        songType: 'local' | 'daily_song' | 'other' | 'playlist',
        // local时才有
        filePath?: string
    }

    export interface profileInfo {
        // 用户id
        userId: string | number
        // 类型(目前不知道)
        userType: number,
        nickname: string,
        avatarUrl?: string,
        backgroundUrl?: string,
        signature?: string
        accountType: number
        birthday?: number
        gender: number
        // 毫秒级
        lastLoginTime: number
        lastLoginIP: string
    }

    // 歌词详情
    export interface lrc {
        lyricUser: {
            id: number,
            status: number,
            demand: number,
            userid: number,
            nickname: string
            uptime: number
        },
        lrc: {
            version: number
            lyric: string
        },
        klyric: {
            version: number,
            lyric: string
        },
        // 罗马音音译
        tlyric: {
            version: number,
            lyric: string
        },
        // 翻译
        romalrc: {
            version: number,
            lyric: string
        },
    }


    // 歌手的结构
    export interface artist {
        // 歌手id
        id: number
        // 歌手名称
        name: string
    }
    // 专辑的结构
    export interface album {
        // 专辑id
        id: number
        // 专辑名称
        name: string
        // 专辑图片
        picUrl?: string
        tns?: any[]
        alias?: any[]
    }
}

// 主要响应字段
declare interface responseData {
    code: number,
    message?: string,
}
