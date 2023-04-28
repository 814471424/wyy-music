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


/**
 * 获取 mv 数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 
 *      歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用
 *       ' mv 地址' 接口
 * mvid: mv 的 id
 */
export function mvDetail(
    mvid: String | number
): Promise<responseData & { data: MV.mvDetail }> {
    return request.get('/mv/detail', { params: { mvid } })
}

/**
 * mv 地址
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 
 * id: mv id
 * 可选参数
 * r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 */
export function mvUrl(
    mvid: String | number,
    r?: number
): Promise<responseData & { data: { id: number, url: string, r: number, size: number } }> {
    return request.get('/mv/url', { params: { id: mvid, r } })
}


/**
 * mv 评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
 * 必选参数 
 * id: mv id
 * 可选参数
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 */
export function commentMv(
    mvid: String | number,
    params: { limit?: number, offset?: number, before?: number }
): Promise<
    responseData & {
        cnum: number,
        commentBanner?: string,
        comments: Array<Comment.CommentDetail>
        hotComments?: Array<Comment.CommentDetail>
        isMusician: boolean
        more: boolean
        moreHot: boolean
        topComments: Array<Comment.CommentDetail>
        total: number
        userId: number
    }
> {
    return request.get('/comment/mv', { params: { ...params, id: mvid } })
}




/**
 * 获取推荐视频
 * 说明 : 调用此接口, 可获取推荐视频,分页参数只能传入 offset
 * 必选参数 
 * 可选参数
 * offset: 默认 0
 */
export function videoTimelineRecommend(
    params: { offset?: number }
): Promise<responseData & { datas: MV.videoRecommend[] }> {
    return request.get('/video/timeline/recommend', { params: { ...params, timestamp: new Date().getTime(), } })
}
