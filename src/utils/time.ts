/*
关于时间处理相关的
*/

/**
 * 时间格式 时间戳转换成 00:00:00 格式
 * @param value 时间戳(秒)
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

/**
 * 时间格式 时间戳转换成 00:00:00 格式
 * @param value 时间戳(毫秒)
 */
export function millisecondToTime(value: number) {
    if (isNaN(value)) {
        return "00:00";
    }
    if (value > 3600000) {
        return new Date(value - 8 * 3600 * 1000).toLocaleString().replace(/\d{1,4}\/\d{1,2}\/\d{1,2}/, ' ')
    } else {
        return new Date(value - 8 * 3600 * 1000).toLocaleString().replace(/\d{1,4}\/\d{1,2}\/\d{1,2} \d{1,2}:/, ' ')
    }
}

/**
 * 时间格式 时间戳转换成 0000-00-00 格式
 * @param value 时间戳(毫秒)
 */
export function millisecondToDate(value: number) {
    if (isNaN(value)) {
        return "0000-00-00";
    }
    // let datetime = new Date(value - 8 * 3600 * 1000);
    let datetime = new Date(value);
    return datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate()
}

/**
 * 时间格式 时间戳转换成 00月00日 格式
 * @param value 时间戳(毫秒)
 */
export function millisecondToDateName(value: number) {
    if (isNaN(value)) {
        return "01月01日";
    }
    let datetime = new Date(value);
    return (datetime.getMonth() + 1) + '月' + datetime.getDate() + '日'
}