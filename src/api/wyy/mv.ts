import request from '../../utils/request'

/**
 * 推荐 mv
 * 说明 : 调用此接口 , 可获取推荐 mv
 */
export function PersonalizedMv(
): Promise<responseData & { result: MV.mvItem[] }> {
    return request.get('/personalized/mv')
}