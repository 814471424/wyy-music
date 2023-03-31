import axios from "../../utils/request";

/*
 * 描述: [获取每日推荐歌曲]
 * 时间: 2023/03/30 16:46:28
 */
export function recommendSongs(
): Promise<responseData & { data: { dailySongs: Playlist.dailySong[] } }> {
    return axios.get('/recommend/songs')
}