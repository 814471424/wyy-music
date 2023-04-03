import { useMainStore } from '../store/index'
import { usePlayListStore } from '../store/playlist'
import api from '../api/index'

export async function playOne(song: Common.songX) {
    let mainStore = useMainStore();
    let playListStore = usePlayListStore();

    let url = "";
    let lycs: Array<number | string> = [];

    // 不是本地的需要查找资源url, 查找歌词
    if (song.songType != 'local') {
        let res = await api.getMP3(song.id);
        if (res.code == 200) {
            url = res.data[0].url ?? "";
        }
    } else {
        url = "https://stream.localhost/" + song.filePath
    }

    mainStore.setUrl(url);
    mainStore.setLycs(lycs);
    mainStore.setSongxData(song);

    // 播放
    playListStore.addOne(song);
}

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