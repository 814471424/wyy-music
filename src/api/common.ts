import axios from '../utils/request'

// 比较通用或者不知道分类的接口

/*
 * 描述: [填写表述]
 * 时间: 2023/03/29 10:40:54
 * 
 * @param
 *  - 参数: 参数介绍
 *  - type: 资源类型,对应以下类型,默认为 0 即 PC
 *          0: pc 
 *          1: android
 *          2: iphone
 *          3: ipad
 * @return
 *  - 参数: 参数介绍
 */
export function banner(
    btype: number = 0
): Promise<responseData & { banners: Common.bannerData[] }> {
    return axios.get('/banner', { params: { 'type': btype } })
}



