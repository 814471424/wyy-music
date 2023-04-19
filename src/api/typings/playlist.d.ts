// 推荐类的数据接口
declare namespace Playlist {
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
        al?: {
            // 专辑id
            id: number
            // 专辑名称
            name: string
            // 专辑图片
            picUrl: string
            // 图片id
            pic_str: string
        }
    }

    // 查找歌曲连接时候获取到的字段
    export interface songUrl {
        // 歌曲id
        id: string | number
        // 歌曲地址
        url: string | null
        // 歌曲总时长
        time: number
        // 扩展类型
        type: string
        encodeType: string
    }

    // 歌单简要字段
    export interface playList {
        id: number,
        picUrl: string,
        playCount?: number,
        playcount?: number,
        name: string
    }

    // 歌单详情
    export interface playListDetail {
        // 歌单id
        id: number,
        // 标题
        name: string,
        // 标签
        tags: string[],
        // 歌单里所有的歌曲
        trackIds: { id: number }[]
        // 简介
        description: string
        // 收藏者
        subscribers: any[],
        // 封面
        coverImgUrl: string
        // 创建用户
        creator: Common.profileInfo,
        // 播放列表
        playCount: number
        // 歌曲数量
        trackCount: number
        // 分享数量
        shareCount: number
        // 收藏数量
        subscribedCount: number
        // 创建事件
        createTime: number
    }

    // 歌单分类
    export interface Catlist {
        // 歌单分类时的字段
        name?: string,
        resourceCount?: number
        imgId?: number
        imgUrl?: string
        type?: number
        // 0: 语种
        // 1: 风格
        // 2: 场景
        // 3: 情感
        // 4: 主题
        category?: number
        resourceType?: number
        hot?: boolean
        activity?: boolean
    }
}