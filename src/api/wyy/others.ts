import request from '../../utils/request'

type searchResponse = responseData & {
    result: {
        // 单曲跟歌词都用这个
        songs?: Playlist.dailySong[],
        songCount?: number,
        searchQcReminder?: any | null,
        albums?: Search.album[],
        albumCount?: number,
        artists?: Common.artist[],
        artistCount?: number,
        playlists?: Search.playlist[],
        playlistCount?: number,
        userprofiles?: any[],
        userprofileCount?: number,
        mvs?: any[],
        mvCount?: number,
        djRadios?: any[],
        djRadiosCount?: number,
        videos?: Search.video[],
        videoCount?: number,
    }
}

// 比较通用或者不知道分类的接口

/*
 * 描述: [获取 banner( 轮播图 ) 数据]
 * 时间: 2023/03/29 10:40:54
 * 
 * @param
 *  - 参数: 参数介绍
 *  - type: 资源类型,对应以下类型,默认为 0 即 PC
 *          0: pc 
 *          1: android
 *          2: iphone
 *          3: ipad
 * @return
 *  - 参数: 参数介绍
 */
export function banner(
    btype: number = 0
): Promise<responseData & { banners: Common.bannerData[] }> {
    return request.get('/banner', { params: { 'type': btype } })
}

/**
 * 搜索
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 ,
 * 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * - keywords : 关键词
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * - 调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空(更全)
 * @param {Object} params
 * @param {string} params.keywords
 * @param {number=} params.limit
 * @param {number=} params.offset
 * @param {number=} params.type
 */

export function search(
    params: {
        keywords: string, offset?: number, limit?: number,
    },
    stype: Search.searchType = Search.searchType.sound
): Promise<
    responseData & {
        count?: number
        list?: Array<Playlist.dailySong | Common.artist | Search.video | Search.playlist | any>
    }
> {
    return request.get<any, searchResponse, any>('/cloudsearch', { params: { ...params, type: stype } }).then(res => {
        return {
            code: res.code,
            message: res.message,
            list: res.result.albums ?? res.result.artists ?? res.result.djRadios
                ?? res.result.mvs ?? res.result.playlists ?? res.result.songs ?? res.result.videos ?? [],
            count: res.result.albumCount ?? res.result.artistCount ?? res.result.djRadiosCount
                ?? res.result.mvCount ?? res.result.playlistCount ?? res.result.songCount ?? res.result.videoCount ?? 0
        }
    })
}
