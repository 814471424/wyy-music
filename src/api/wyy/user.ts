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