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
