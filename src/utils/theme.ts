interface themeConfig {
    // 主要主题颜色
    primaryColor?: string;
    primaryBackgroundColor?: string;
    primaryTextColor?: string;
}

class Theme {
    static init() {
        const config: themeConfig = JSON.parse(localStorage.getItem('theme') ?? "{}");

        if (config.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', config.primaryColor)
        }
        if (config.primaryBackgroundColor) {
            document.documentElement.style.setProperty('--primary-background-color', config.primaryBackgroundColor)
        }
        if (config.primaryTextColor) {
            document.documentElement.style.setProperty('--primary-text-color', config.primaryTextColor)
        }
    }

    static setConfig(config: themeConfig) {
        localStorage.setItem('theme', JSON.stringify(config))

        this.init()
    }
}

function colorRgba(str: string, n: number) {
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    n = n || 1;
    //十六进制颜色转换为RGB格式
    if (sColor && reg.test(sColor)) {
        let sColorChange = getRgbNum(sColor);
        return "rgba(" + sColorChange.join(",") + "," + n + ")";
    } else {
        return sColor;
    }
}
function getRgbNum(sColor: string) {
    if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {  //补全颜色值 例如：#eee,#fff等
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
    }
    //处理六位颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
        //核心代码，通过parseInt将十六进制转为十进制，parseInt只有一个参数时是默认转为十进制的，第二个参数则是指定转为对应进制
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
}

function LightDarkenColor(color: string, num: number = -10) {
    let colorArr = getRgbNum(color);
    let sColorChange = [];
    for (var i = 0; i < colorArr.length; i++) {
        let val = colorArr[i] + num;
        if (val < 0) {
            val = 0;
        }
        if (val > 255) {
            val = 255;
        }
        sColorChange.push(val)
    }
    return "rgba(" + sColorChange.join(",") + ",1)";
}

export default Theme
export type {
    themeConfig
}
export {
    LightDarkenColor
}