import { useMainStore } from '../store/index'
import { usePlayListStore } from '../store/playlist'
import api from '../api/index'

// 播放歌曲
export async function playOne(song: Common.songX) {
    let mainStore = useMainStore();
    let playListStore = usePlayListStore();

    let url = '';
    let lycs: Array<number | string> = [];
    let lyc = '';
    let tlyric = '';
    let romalrc = '';

    // 不是本地的需要查找资源url, 查找歌词
    if (song.songType != 'local') {
        let res = await api.getMP3(song.id);
        if (res.code == 200) {
            url = res.data[0].url ?? "";
            // 之后获取歌词
            let lysRes = await api.getLyric(song.id)
            if (lysRes.code == 200) {
                lyc = lysRes.lrc.lyric
                tlyric = lysRes.tlyric.lyric
                romalrc = lysRes.romalrc.lyric
            }
        }
    } else {
        url = "https://stream.localhost/" + song.filePath
    }

    mainStore.setUrl(url);
    mainStore.setLycs(lycs);
    mainStore.setLyc(lyc, tlyric, romalrc);
    mainStore.setSongxData(song,);

    // 播放
    playListStore.addOne(song);
}

// 本地文件转化成通用播放音乐格式
export function fileToSongx(name: string, path: string): Common.songX {
    return {
        id: name,
        name: name,
        alia: [],
        ar: [],
        al: undefined,
        dt: 0,  // 需要外部配合
        songType: 'local',
        filePath: path
    }
}


/*
 * 描述: [填写表述]
 * 时间: 2023/04/06 09:01:53
 * 
 * @param
 *  - 参数: 参数介绍
 *    lyric     : 歌词一
 *    tlyric    : 翻译
 *    romalrc   : 罗马音音译
 * @return
 *  - 参数: 参数介绍
 *    Array: [时间, 歌词一, 翻译 ,罗马音音译]
 */
// 处理字符串歌曲
// : 歌词
export function handleLrc(lyric: string, tlyric = '', romalrc = ''): Array<string | number>[] {
    let lycc = lyric; // 获取歌词列表
    let lyclist = lycc.split('\n'); // 以换行来分割
    let re = /\[\d{2}:\d{2}\.\d{2,3}\]/; //匹配时间
    let lyc = [];
    for (let i in lyclist) {
        if (lyclist[i]) {
            let date = lyclist[i].match(re);  // 匹配时间
            let timeStr = date ? date[0] : '';
            let dateText = timeStr.slice(1, -1); // 去除【】
            let timelist = dateText.split(":"); //以: 分割
            let m = timelist[0];
            let s = timelist[1];
            let time = parseFloat(m) * 60 + parseFloat(s);  //计算时间

            let lrcItem = lyclist[i].replace(timeStr, ""); // 获取歌词
            let tlyricItem = getLrcByTime(tlyric, time);
            let romalrcItem = getLrcByTime(romalrc, time);
            lyc.push([time, lrcItem, tlyricItem, romalrcItem]);
        }
    }

    return lyc
}
function getLrcByTime(lyric: string, time: number): string {
    let lrc = '';
    let lyclist = lyric.split('\n'); // 以换行来分割

    let re = /\[\d{2}:\d{2}\.\d{2,3}\]/; //匹配时间
    for (let i in lyclist) {
        if (lyclist[i]) {
            let date = lyclist[i].match(re);  // 匹配时间
            let timeStr = date ? date[0] : '';
            let dateText = timeStr.slice(1, -1); // 去除【】
            let timelist = dateText.split(":"); //以: 分割
            let m = timelist[0];
            let s = timelist[1];
            let ltime = parseFloat(m) * 60 + parseFloat(s);  //计算时间

            if (ltime == time) {
                lrc = lyclist[i].replace(timeStr, ""); // 获取歌词
                break;
            }
        }
    }
    return lrc
}