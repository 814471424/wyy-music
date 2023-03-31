declare namespace Common {
    // 轮播图
    export interface bannerData {
        imageUrl: string,
        typeTitle: string,
        targetId: number,
        targetType: number,
        titleColor: string
    }

    // 音乐字段
    export interface SongItem {

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

    // store里面的音乐的数据格式
    // 歌曲面板信息
    export interface songX {
        // 歌曲的id
        id: string | number,
        // 歌曲图片
        url: string,
        // 歌曲名称
        name: string,
        // 本地音乐还是线上音乐, null为web
        songType?: 'local' | 'web'
    }

}

// 主要响应字段
declare interface responseData {
    code: number,
    message?: string,
}


// 推荐类的数据接口
declare namespace Playlist {
    // 推荐歌单
    export interface playlist {

    }

    // 每日推荐
    export interface dailySong {
        // 音乐的id
        id: number | string;
        // 音乐标题
        name: string;
        // 标签
        alia: string[];
        // 时间戳（毫秒）
        dt: number
        // 歌手
        ar: {
            // 歌手id
            id: number
            // 歌手名称
            name: string
        }[]
        // 专辑
        al: {
            // 专辑id
            id: number
            // 专辑名称
            name: string
            // 专辑图片
            picUrl: string
            // 图片id
            pic_str: string
        }[]
    }
}

// 用户类相关数据
declare namespace Auth {
}