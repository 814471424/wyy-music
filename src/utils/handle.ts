// 处理播放数量
export function handlePlayCount(data: number): String {
    let play = data as unknown as string;
    if (data > 10000) {
        play = Math.floor(data / 10000) + '万'
    }
    return play
}