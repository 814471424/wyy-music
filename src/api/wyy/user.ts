import request from '../../utils/request'

/**
 * 获取账号详情
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 */
export function userAccount(): Promise<responseData & { profile: Common.profileInfo }> {
    return request.get('/user/account',);
}

/*
 * 签到进度
 */
export function signinProgress(noCache = false): Promise<responseData & { data: { today: { todaySignedIn: boolean } } }> {
    let params = {};
    if (noCache) params = { ...params, timestamp: new Date().getTime() };

    return request.get('/signin/progress', { params })
}

/*
 * 签到进度
 */
export function dailySignin(): Promise<responseData> {
    return request.get('/daily_signin')
}

/*
 * 获取用户关注列表
 */
export function userFollows(
    params: {
        uid: number | string,
        limit?: number,
        offset?: number
    }
): Promise<responseData & { follow: any[] }> {
    return request.get('/user/follows', { params })
}

/*
 * 获取用户粉丝列表
 */
export function userFolloweds(
    params: {
        uid: number | string,
        limit?: number,
        offset?: number
    }
): Promise<responseData & { size: number }> {
    return request.get('/user/followeds', { params })
}


/*
 * 获取用户动态
 */
export function userEvent(
    params: {
        uid: number | string,
        limit?: number,
    }
): Promise<responseData & { size: number }> {
    return request.get('/user/event', { params })
}


/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export function userPlaylist(params: {
    uid: number | string,
    limit?: number,
    offset?: number
}): Promise<responseData & { playlist: Playlist.playListDetail[] }> {
    return request.get('/user/playlist', { params })
}


/*
 * 登录状态
 */
export function loginStatus(): Promise<{
    data: {
        code: number,
        profile?: Common.profileInfo | null
        account: any | null
    }
}> {
    return request.get('/login/status', {
        params: {
            timestamp: new Date().getTime(),
        }
    });
}