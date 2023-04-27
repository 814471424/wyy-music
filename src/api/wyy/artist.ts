import request from '../../utils/request'

/**
 * 歌手分类列表
 * 说明 : 调用此接口,可获取歌手分类列表
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
 * type 取值:
 *      -1:全部
 *      1:男歌手
 *      2:女歌手
 *      3:乐队
 * area 取值:
 *      -1:全部
 *      7华语
 *      96欧美
 *      8:日本
 *      16韩国
 *      0:其他
 * @param {number} id
 */
export function artistList(params: {
    limit?: number,
    offset?: number,
    type?: string,
    area?: string,
    initial?: string
}): Promise<responseData & { artists: Common.artist[], more?: boolean }> {
    return request.get('/artist/list', { params });
}


/**
 * 获取歌手详情
 * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * id : 歌手 id
 * @param {number} id
 */
export function artistDetail(
    id: number
): Promise<
    responseData & { data: { artist: Common.artistDetail } }
> {
    return request.get('/artist/detail', { params: { id } });
}

/**
 * 获取歌手详情
 * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * id : 歌手 id
 * @param {number} id
 */
export function artistDesc(
    id: number
): Promise<responseData & Common.artistDesc> {
    return request.get('/artist/desc', { params: { id } });
}

/**
 * 获取相似歌手
 * 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * id : 歌手 id
 * @param {number} id
 */
export function simiArtist(
    id: number
): Promise<responseData & { artists: Common.artist[] }> {
    return request.get('/simi/artist', { params: { id } });
}

/**
 * 获取歌手专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * id : 歌手 id
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @param {number} id
 */
export function artistAlbum(
    id: number,
    params: {
        limit?: number,
        offset?: number
    }
): Promise<responseData & { hotAlbums: Search.album[], artist: Common.artist }> {
    return request.get('/artist/album', { params: { ...params, id } });
}