import request from '../../utils/request'

export default {}

/**
 * 获取音乐 url
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,
 * !!!未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * @param {string} id - 音乐的 id，例如 id=405998841,33894312
 */
export function getMP3(
    id: string | number
): Promise<responseData & { data: Playlist.songUrl[] }> {
    const getBr = () => {
        // 当返回的 quality >= 400000时，就会优先返回 hi-res
        // const quality = store.state.settings?.musicQuality ?? '320000';
        let quality = '320000';
        return quality === 'flac' ? '350000' : quality;
    };

    return request.get('/song/url', {
        params: {
            id,
            br: getBr(),
        }
    });
}

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * @param {string} ids - 音乐 id, 例如 ids=405998841,33894312
 */
export function getTrackDetail(
    ids: string
): Promise<responseData & { songs: Playlist.dailySong[] }> {
    return request.get('/song/detail', {
        params: {
            ids
        }
    })
}

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * @param {number} id - 音乐 id
 */
export function getLyric(
    id: number | string
): Promise<responseData & Common.lrc> {
    return request.get('/lyric', { params: { id } })
}