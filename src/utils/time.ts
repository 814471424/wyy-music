/*
关于时间处理相关的
*/

/**
 * 时间格式 时间戳转换成 00:00:00 格式
 * @param value 时间戳
 */
export function durationToTime(value: number) {
    if (isNaN(value)) {
        return "00:00";
    }
    if (value > 3600) {
        return new Date(value * 1000 - 8 * 3600 * 1000).toLocaleString().replace(/\d{1,4}\/\d{1,2}\/\d{1,2}/, ' ')
    } else {
        return new Date(value * 1000 - 8 * 3600 * 1000).toLocaleString().replace(/\d{1,4}\/\d{1,2}\/\d{1,2} \d{1,2}:/, ' ')
    }
}