// 歌词类型
export enum lycsTypeEnum {
    sound = 0,   // 音
    translate = 1,   // 译
    all = 2,   // 音 + 译
    null = 3   // 都不要
}


// 处理好的歌词详情
export interface lycItem {
    // 时间(毫秒)
    time: number,
    // 时间(字符串)
    timeStr?: string,
    // 歌词
    lyric: string,
    // 翻译
    tlyric: string,
    // 罗马音
    romalrc: string,
}