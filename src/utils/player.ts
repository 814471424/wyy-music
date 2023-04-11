import { useMainStore } from '../store/index'
import { usePlayListStore } from '../store/playlist'
import { useSettingStore } from '../store/setting'
import api from '../api/index'
import { invoke } from '@tauri-apps/api/tauri'

// 播放歌曲
export async function playOne(song: Common.songX) {
    let mainStore = useMainStore();
    let playListStore = usePlayListStore();

    let url = '';
    let lycs: Array<number | string> = [];
    let lyc = '';
    let tlyric = '';
    let romalrc = '';
    let songx = song

    // 不是本地的需要查找资源url, 查找歌词
    if (song.songType != 'local') {
        // 先查找歌曲
        let trackRes = await api.getTrackDetail(song.id as string);
        let songCache = trackRes.songs[0];
        if (songCache) {
            songx = { ...songCache, songType: song.songType || 'other' }
        } else {
            return
        }

        let res = await api.getMP3(song.id);
        if (res.code != 200) {
            return
        }
        url = res.data[0].url ?? "";
        // 之后获取歌词
        let lysRes = await api.getLyric(song.id)
        if (lysRes.code == 200) {
            lyc = lysRes.lrc?.lyric ?? ''
            tlyric = lysRes.tlyric?.lyric ?? ''
            romalrc = lysRes.romalrc?.lyric ?? ''
        }
    } else {
        if (!song.filePath) {
            return
        }
        url = "https://stream.localhost/" + song.filePath
    }

    // 播放并各种缓存
    mainStore.setUrl(url);
    mainStore.setLycs(lycs);
    mainStore.setLyc(lyc, tlyric, romalrc);
    mainStore.setSongxData(songx);
    playListStore.addOne(songx);
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

// 下载
export async function download(songId: string | number) {
    const settingStore = useSettingStore()

    let exist = await invoke('exist', {
        path: settingStore.setting.savePath ?? ''
    });
    if (!exist) {
        console.log('找不到目录: ' + settingStore.setting.savePath ?? '')
        return
    }

    // 查找歌曲详情
    let trackRes = await api.getTrackDetail(songId as string);
    let songCache = trackRes.songs[0];
    if (!songCache) {
        return
    }

    // 查找歌曲地址
    let res = await api.getMP3(songId, 911000);
    let songUrlData = res.data[0];
    if (!songUrlData) {
        return
    }

    invoke('download', {
        url: songUrlData.url,
        path: settingStore.setting.savePath ?? '',
        nameType: 1,
        name: songCache.name,
        ext: songUrlData.encodeType || songUrlData.type || 'mp3',
    }).then(res => {
        console.log(res)
    })
    console.log(songUrlData)
}