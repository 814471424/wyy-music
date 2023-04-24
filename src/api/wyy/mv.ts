import request from '../../utils/request'

/**
 * 推荐 mv
 * 说明 : 调用此接口 , 可获取推荐 mv
 */
export function personalizedMv(
): Promise<responseData & { result: MV.mvItem[] }> {
    return request.get('/personalized/mv')
}

/**
 * 独家放送(入口列表)
 * 说明 : 调用此接口 , 可获取独家放送
 */
export function personalizedPrivatecontent(
): Promise<responseData & { name?: string, result: MV.privatecontentItem[] }> {
    return request.get('/personalized/privatecontent')
}


/**
 * 获取视频播放地址
 * 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
 */
export function videoUrl(
    id: string | number
): Promise<responseData & { urls: Common.videoUrl[] }> {
    return request.get('/video/url', { params: { id } })
}

/**
 * 获取视频播放地址
 * 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
 */
export function videoDetail(
    id: String | number
): Promise<responseData & { data: Common.videoDetail }> {
    return request.get('/video/detail', { params: { id } })
}