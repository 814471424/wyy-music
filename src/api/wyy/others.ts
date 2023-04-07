import request from '../../utils/request'

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
    stype: Search.searchType.song = 1
): Promise<
    responseData & {
        result: {
            // 单曲跟歌词都用这个
            songs?: Search.song[],
            songCount?: number,
            searchQcReminder?: any | null,
            albums?: any[],
            albumCount?: number,
            artists?: any[],
            artistCount?: number,
            playlists?: any[],
            playlistCount?: number,
            userprofiles?: any[],
            userprofileCount?: number,
            mvs?: any[],
            mvCount?: number,
            djRadios?: any[],
            djRadiosCount?: number,
            videoCount?: any[],
            videos?: number,
        }
    }
> {
    return request.get('/search', { params: { ...params, type: stype } })
}
