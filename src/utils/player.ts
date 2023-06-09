import { useMainStore } from '../store/index'
import { usePlayListStore } from '../store/playlist'
import { useSettingStore } from '../store/setting'
import api from '../api/index'
import { invoke } from '@tauri-apps/api/tauri'
import { PlayRules } from '../api/typings/enum'

// 播放歌曲
export async function playOne(song: Common.songX) {
  let mainStore = useMainStore();
  let playListStore = usePlayListStore();
  let url = '';
  let songx = song

  // 防止多次请求
  if (songx.id == mainStore.id) {
    return
  }
  mainStore.setId(songx.id as string);

  // 不是本地的需要查找资源url, 查找歌词
  if (song.songType != 'local') {
    // 先查找歌曲
    // let trackRes = await api.getTrackDetail(song.id as string);
    // let songCache = trackRes.songs[0];
    // if (songCache) {
    //   songx = { ...songCache, songType: song.songType || 'other' }
    // } else {
    //   return
    // }

    let res = await api.getMP3(song.id);
    if (res.code != 200) {
      return
    }
    url = res.data[0].url ?? "";

    // 之后获取歌词-不要阻塞
    api.getNewLyric(song.id).then(lysRes => {
      let lyc = '';
      let tlyric = '';
      let romalrc = '';
      let yrc = '';
      let yromalrc = '';

      if (lysRes.code == 200) {
        lyc = lysRes.lrc ? (lysRes.lrc.lyric ?? '') : ''
        tlyric = lysRes.tlyric ? (lysRes.tlyric.lyric ?? '') : ''
        romalrc = lysRes.romalrc ? (lysRes.romalrc.lyric ?? '') : ''
        yrc = lysRes.yrc ? (lysRes.yrc.lyric ?? '') : ''
        yromalrc = lysRes.yromalrc ? (lysRes.yromalrc.lyric ?? '') : ''
      }
      mainStore.setUrl(url + "?timeStamp=" + new Date().getTime());
      mainStore.setLyc(lyc, tlyric, romalrc, yrc, yromalrc);
    }).catch(_error => {
      let lyc = '';
      let tlyric = '';
      let romalrc = '';

      mainStore.setUrl(url + "?timeStamp=" + new Date().getTime());
      mainStore.setLyc(lyc, tlyric, romalrc);
    })
  } else {
    if (!song.filePath) {
      return
    }
    url = "https://stream.localhost/" + song.filePath
    mainStore.setUrl(url);
  }

  // 播放并各种缓存
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

// 播放上一首
export function playPrevious() {
  const mainStore = useMainStore();
  const playListStore = usePlayListStore();
  const list = playListStore.list;
  const songX = mainStore.songX;

  if (list.length == 0) {
    return
  }

  let id = songX?.id ?? '';
  let index = list.findIndex((x) => x.id === id);
  if (index == -1) {
    return
  }
  let playIndex = ((index - 1) + list.length) % list.length
  if (list[playIndex]) {
    playOne(list[playIndex]);
  }
}

// 播放下一首
export function playNext() {
  const mainStore = useMainStore();
  const playListStore = usePlayListStore();
  const settingStore = useSettingStore()
  const list = playListStore.list;
  const songX = mainStore.songX;

  if (list.length == 0) {
    return
  }

  let id = songX?.id ?? '';
  let index = list.findIndex((x) => x.id === id);
  if (index == -1) {
    return
  }

  if (settingStore.setting.playRule == PlayRules.random) {
    let randomIndex = Math.floor(Math.random() * list.length);
    if (randomIndex == index) {
      mainStore.setUrl(mainStore.musicUrl + '?timestamp' + new Date().getTime())
    } else {
      if (list[randomIndex]) {
        playOne(list[randomIndex]);
      }
    }
  } else {
    let playIndex = (index + 1) % list.length
    if (list[playIndex]) {
      playOne(list[playIndex]);
    }
  }
}

// 播放结束时的事件
export function handEnd() {
  const mainStore = useMainStore();
  const playListStore = usePlayListStore();
  const settingStore = useSettingStore()
  const list = playListStore.list;
  const songX = mainStore.songX;

  const id = songX?.id ?? '';
  let index = list.findIndex((x) => x.id === id);
  // 不在播放列表里，忽略
  if (index == -1) {
    return
  }

  // 根据不同情况播放
  switch (settingStore.setting.playRule) {
    // 列表循环
    case PlayRules.listLoop:
      let listLoopIndex = (index + 1) % list.length
      if (list[listLoopIndex]) {
        playOne(list[listLoopIndex]);
      }
      break;
    // 单曲循环
    case PlayRules.singleLoop:
      mainStore.setUrl(mainStore.musicUrl + '?timestamp' + new Date().getTime())
      break;
    // 随机播放
    case PlayRules.random:
      let randomIndex = Math.floor(Math.random() * list.length);
      if (randomIndex == index) {
        mainStore.setUrl(mainStore.musicUrl + '?timestamp' + new Date().getTime())
      } else {
        if (list[randomIndex]) {
          playOne(list[randomIndex]);
        }
      }
      break;
    // 顺序播放
    default:
      let orderIndex = index + 1;
      if (orderIndex > list.length) {
        return
      }

      if (list[orderIndex]) {
        playOne(list[orderIndex]);
      }
      break;
  }
}


// 错误时的处理
export function hanldError() {
  const mainStore = useMainStore();
  const playListStore = usePlayListStore();
  const list = playListStore.list;
  const songX = mainStore.songX;

  const id = songX?.id ?? '';

  // 查找错误的index
  const errorIndex = list.findIndex((x) => x.id === id);
  if (errorIndex == -1 || mainStore.musicUrl == '') {
    mainStore.clear()
    return
  }
  mainStore.clear()
  playListStore.removeOne(id)

  let playIndex = (errorIndex) % list.length
  if (list[playIndex]) {
    playOne(list[playIndex]);
  }
}