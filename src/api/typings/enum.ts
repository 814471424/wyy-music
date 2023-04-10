/**
* 搜索的类型(可能用于其他地方)
* 1: 单曲
* 10: 专辑
* 100: 歌手
* 1000: 歌单
* 1002: 用户
* 1004: MV
* 1006: 歌词
* 1009: 电台
* 1014: 视频
* 1018: 综合
* 2000: 声音
*/
enum searchType {
    song = 1,
    album = 10,
    artist = 100,
    playlist = 1000,
    userprofile = 1002,
    mv = 1004,
    lyric = 1006,
    djRadio = 1009,
    video = 1014,
    combined = 1018,
    sound = 2000,
}

export {
    searchType
}