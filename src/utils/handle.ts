// 处理播放数量
export function handlePlayCount(data: number): String {
    let play = data as unknown as string;
    if (data > 10000) {
        play = Math.floor(data / 10000) + '万'
    }
    return play
}

// 处理关键字
export function handleKeyword(data: string, keyword: string): string {
    let key = data;
    if (keyword) {
        key = data.replaceAll(keyword, '<div style="color: #507daf">' + keyword + '</div>');
    }
    return key
}