import { type } from "os";
import request from "../../utils/request";

/*
 * 描述: [获取每日推荐歌曲]
 * 时间: 2023/03/30 16:46:28
 */
export function recommendSongs(
): Promise<responseData & { data: { dailySongs: Playlist.dailySong[] } }> {
    return request.get('/recommend/songs')
}

/**
 * 获取每日推荐歌单
 * 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
 * @param {Object} params
 * @param {number=} params.limit
 */
export function dailyRecommendPlaylist()
    : Promise<responseData & { recommend: Playlist.playList[] }> {
    return request.get('/recommend/resource');
}


/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * - limit: 取出数量 , 默认为 30 (不支持 offset)
 * - 调用例子 : /personalized?limit=1
 * @param {Object} params
 * @param {number=} params.limit
 */
export function recommendPlaylist(params: { limit?: number })
    : Promise<responseData & { result: Playlist.playList[] }> {
    return request.get('/personalized', { params });
}


/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
 * 但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口
 * 获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * - id : 歌单 id
 * - s : 歌单最近的 s 个收藏者, 默认为8
 * @param {number} id
 */
export function getPlaylistDetail(
    params: { id: number | string, s?: number }
): Promise<responseData & { playlist: Playlist.playListDetail }> {
    return request.get('/playlist/detail', { params });
}

/**
 * 歌单分类
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export function playlistCatlist()
    : Promise<
        responseData &
        {
            all: Playlist.Catlist,
            sub: Playlist.Catlist,
            categories: { [key: number]: string }
        }
    > {
    return request.get('/playlist/catlist');
}

/**
 * 获取精品歌单
 * 说明 : 调用此接口 , 可获取精品歌单
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * - limit: 取出歌单数量 , 默认为 20
 * - before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @param {Object} params
 * @param {string} params.cat
 * @param {number=} params.limit
 * @param {number} params.before
 */
export function highQualityPlaylist(params: {
    cat?: string,
    limit?: number,
    before?: number
}): Promise<
    responseData &
    {
        playlists: Playlist.playListDetail[],
        more: boolean,
        lasttime: number,
        total: number
    }
> {
    return request.get('/top/playlist/highquality', { params });
}