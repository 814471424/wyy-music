import request from '../../utils/request'

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param {number} id
 */
export function getAlbum(
    id: number | string
): Promise<responseData & { album: Search.album, songs: Search.song[] }> {
    return request.get('/album', {
        params: {
            id,
        }
    })
}