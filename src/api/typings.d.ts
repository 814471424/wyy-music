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
    // 本地音乐还是线上音乐, null为web
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
}

// 主要响应字段
declare interface responseData {
  code: number,
  message?: string,
}

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

  export interface songUrl {
    // 歌曲id
    id: string | number
    // 歌曲地址
    url: string | null
    // 歌曲总时长
    time: number
  }

  // 歌单
  export interface playList {
    id: number,
    picUrl: string,
    playcount: number,
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
}

// 用户类相关数据
declare namespace Auth {
}