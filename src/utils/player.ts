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

    // 不是本地的需要查找资源url, 查找歌词
    if (song.songType != 'local') {
        let res = await api.getMP3(song.id);
        if (res.code == 200) {
            url = res.data[0].url ?? "";
            // 之后获取歌词
            let lysRes = await api.getLyric(song.id)
            if (lysRes.code == 200) {
                lyc = lysRes.lrc.lyric
            }
        }
    } else {
        url = "https://stream.localhost/" + song.filePath
    }

    mainStore.setUrl(url);
    mainStore.setLycs(lycs);
    mainStore.setLyc(lyc);
    mainStore.setSongxData(song);

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


// 处理字符串歌曲
export function handleLrc(lyric: string): Array<string | number>[] {
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
            let lrcitem = lyclist[i].replace(timeStr, ""); // 获取歌词
            lyc.push([time, lrcitem]);
        }
    }

    return lyc
}