import axios from "../utils/request";

/*
 * 描述: [手机登录(现在要求验证,暂时绕不过,请使用二维码登录)]
 * 时间: 2023/03/30 12:15:52
 * 
 * @param
 *  - 参数: 参数介绍
 *    param: 请求参数的对象
 *    param.phone: 手机号码
 *    param.password: 密码
 *    param.countrycode: 国家码，用于国外手机号登录，例如美国传入
 *    param.captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
 *      
 * @return
 *  - 参数: 参数介绍
 *    服务460,响应参数未知
 */
export function loginWithPhone(
    params: {
        phone: string, password?: string, countrycode?: string, md5_password?: string, captcha?: string
    }
): Promise<responseData> {
    return axios.post('/login/cellphone', null, { params: params })
}

/*
 * 描述: [邮箱登录(现在要求验证,暂时绕不过,请使用二维码登录)]
 * 时间: 2023/03/30 13:39:02
 * 
 * @param
 *  - 参数: 参数介绍
 * @return
 *  - 参数: 参数介绍
 */
export function loginWithEmail(
    params: { email: string, password?: string, md5_password?: string }
): Promise<responseData> {
    return axios.post('/login', null, { params: params })
}

/*
 * 描述: [二维码key生成接口]
 * 时间: 2023/03/30 14:14:30
 */
export function loginQrCodeKey(): Promise<responseData & { data: { code: number, unikey: string } }> {
    return axios.get('/login/qr/key', {
        params: { timestamp: new Date().getTime() }
    });
}

/*
 * 描述: [二维码生成接口]
 * 时间: 2023/03/30 14:19:17
 */
export function loginQrCodeCreate(
    params: { key: string, qrimg?: string }
): Promise<responseData & { data: { qrurl: string, qrimg: string } }> {
    return axios.get('/login/qr/create', {
        params: {
            ...params,
            timestamp: new Date().getTime(),
        }
    });
}

/*
 * 描述: [二维码检测扫码状态接口]
 * 时间: 2023/03/30 14:21:42
 * 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 */
export function loginQrCodeCheck(
    key: string
): Promise<responseData & { cookie: string, avatarUrl?: string, nickname?: string }> {
    return axios.get('/login/qr/check', {
        params: {
            key,
            timestamp: new Date().getTime(),
        }
    })
}