import { lycItem, yrcItem } from './types'
/*
 * 描述: [处理歌词]
 * 时间: 2023/04/06 09:01:53
 * 
 * @param
 *  - 参数: 参数介绍
 *    lyric     : 歌词一
 *    tlyric    : 翻译
 *    romalrc   : 罗马音
 * @return
 *  - 参数: 参数介绍
 *    lycItem
 */
export function handleLrc(lyric: string, tlyric = '', romalrc = ''): Array<lycItem> {
  type lycInfoItem = {
    t: number
    c: { tx: string }[]
  }

  let lycc = lyric; // 获取歌词列表
  let lyclist = lycc.split('\n'); // 以换行来分割
  let re = /^\[(\d+):(\d+)(\.|\:)(\d+)]/; //匹配时间
  let lyc: Array<lycItem> = [];

  for (let i = 0; i < lyclist.length; i++) {
    try {
      const jsonData: lycInfoItem = JSON.parse(lyclist[i])

      let time = jsonData.t;
      let lrcItem = jsonData.c.map(v => v.tx).join('');
      let tlyricItem = getLrcByTime(tlyric, time);
      let romalrcItem = getLrcByTime(romalrc, time);
      lyc.push({
        time: time,
        timeStr: lyclist[i],
        lyric: lrcItem,
        tlyric: tlyricItem,
        romalrc: romalrcItem
      });
    } catch (error) {
      let date = lyclist[i].match(re);  // 匹配时间
      if (date && (date ?? []).length > 4) {
        let timeStr = date ? date[0] : '';

        let time = Number(date[1]) * 60 * 1000 + Number(date[2] + '.' + date[4]) * 1000;  //计算时间
        let lrcItem = lyclist[i].replace(timeStr, ""); // 获取歌词
        let tlyricItem = getLrcByTime(tlyric, time);
        let romalrcItem = getLrcByTime(romalrc, time);

        lyc.push({
          time: time,
          timeStr: timeStr,
          lyric: lrcItem,
          tlyric: tlyricItem,
          romalrc: romalrcItem
        });
      }
    }
  }

  return lyc
}

function getLrcByTime(lyric: string, time: number, index = -1): string {
  let lrc = '';
  let lyclist = lyric.split('\n'); // 以换行来分割
  let re = /^\[(\d+):(\d+)(\.|\:)(\d+)]/; //匹配时间

  for (let i = 0; i < lyclist.length; i++) {
    if (index > i) {
      continue
    }

    if (lyclist[i]) {
      let date = lyclist[i].match(re);  // 匹配时间
      if (date && (date ?? []).length > 4) {
        let timeStr = date ? date[0] : '';

        let ltime = Number(date[1]) * 60 * 1000 + Number(date[2] + '.' + date[4]) * 1000;  //计算时间

        if (ltime == time) {
          lrc = lyclist[i].replace(timeStr, ""); // 获取歌词
          break;
        }
      }
    }
  }

  return lrc
}

// 当前播放时长
// return index
export function timeupdate(currentTime: number, lycs: Array<lycItem | yrcItem>): number {
  if (lycs.length == 0 || currentTime == 0) {
    return 0
  }

  for (let i = 0; i < lycs.length; i++) {
    if (i == lycs.length - 1) {
      if (lycs[i].time <= currentTime) {
        return i
      }
    } else {
      if (lycs[i].time <= currentTime && currentTime < lycs[i + 1].time) {
        return i;
      }
    }
  }

  return 0;
}


// 解析逐字歌词
export function handleYrc(yrc: string): Array<yrcItem> {
  type lycInfoItem = {
    t: number
    c: { tx: string }[]
  }
  let re = /^\[(\d+),(\d+)]/; // 匹配时间[开始时间, 持续时间]

  if (!yrc || yrc.length == 0 || yrc == ' ') {
    return []
  }

  let yrcList = yrc.split('\n');
  let list = [];
  for (let index = 0; index < yrcList.length; index++) {
    try {
      const jsonData: lycInfoItem = JSON.parse(yrcList[index])
      let time = jsonData.t;
      // let lrcItem = jsonData.c.map(v => v.tx).join('');
      list.push({
        time: time,
        length: 0,
        list: jsonData.c.map(v => {
          return {
            time: time,
            length: 0,
            name: v.tx
          }
        }),
      })
    } catch (error) {
      const element = yrcList[index];
      let data = element.match(re);  // 匹配时间
      if (data) {
        let cacheList = [];
        let yrcArray = yrcList[index].split('(')
        for (let index = 1; index < yrcArray.length; index++) {
          const element = yrcArray[index].split(',').map(v => v.replace('0)', ''))
          cacheList.push({
            time: element[0] as unknown as number,
            length: element[1] as unknown as number,
            name: element[2]
          })
        }
        list.push({
          time: data[1] as unknown as number,
          length: data[2] as unknown as number,
          name: cacheList.map(v => v.name).join(''),
          list: cacheList
        })
      }
    }
  }

  return list
}