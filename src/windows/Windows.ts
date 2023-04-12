import { WebviewWindow, getAll, appWindow } from '@tauri-apps/api/window'

const windowConfig = {
    label: '',              // 窗口唯一lable
    title: '',              // 窗口标题
    url: '',                // 路由地址
    width: 900,             // 窗口宽度
    height: 640,            // 窗口高度
    minWindth: undefined,   // 窗口最小宽度
    minHeight: undefined,   // 窗口最小高度
    x: undefined,           // 窗口相对于屏幕左侧坐标
    y: undefined,           // 窗口相对于屏幕顶端坐标
    center: true,           // 窗口居中显示
    resizable: false,       // 是否支持缩放
    maximized: false,       // 最大化窗口
    decorations: false,     // 窗口是否无边框及导航条
    alwaysOnTop: false,     // 顶置窗口
}

class Windows {
    constructor() {
    }

    // 查找指定标签是否有窗体
    getWin(label: string): WebviewWindow | null {
        return WebviewWindow.getByLabel(label);
    }

    // 查找所有的窗体
    getALlWin() {
        return getAll()
    }

    // 创建新窗体
    async createWin(options?: { [key: string]: any }) {
        const args = Object.assign({}, windowConfig, options)

        // 判断窗口是否存在
        const exisWin = getAll().find(w => w.label == args.label)
        if (exisWin) {
            if (exisWin.label.indexOf('main') == -1) {
                await exisWin?.unmaximize()
                await exisWin?.setFocus()
                return
            }
            await exisWin?.close()
        }

        // 创建窗口对象
        let win = new WebviewWindow(args.label, args);

        // 是否最大化
        if (args.maximized && args.resizable) {
            await win.maximize()
        }

        // 窗口创建完毕/失败
        win.once('tauri://created', function () {
            console.log('window create success!')
        })
        win.once('tauri://error', function (e) {
            console.log(e)
            console.log('window create error!')
        })

    }

    // // 开启主进程监听事件
    // async listen() {
    //     // 创建新窗体
    //     await listen('win-create', (event) => {
    //         console.log(event)
    //         this.createWin(JSON.parse(event.payload))
    //     })

    //     // 显示窗体
    //     await listen('win-show', async (event) => {
    //         if (appWindow.label.indexOf('main') == -1) return
    //         await appWindow.show()
    //         await appWindow.unminimize()
    //         await appWindow.setFocus()
    //     })

    //     // 隐藏窗体
    //     await listen('win-hide', async (event) => {
    //         if (appWindow.label.indexOf('main') == -1) return
    //         await appWindow.hide()
    //     })

    //     // 退出应用
    //     await listen('win-exit', async (event) => {
    //         setWin('logout')
    //         await exit()
    //     })

    //     // 重启应用
    //     await listen('win-relaunch', async (event) => {
    //         await relaunch()
    //     })

    //     // 主/渲染进程传参
    //     await listen('win-setdata', async (event) => {
    //         await emit('win-postdata', JSON.parse(event.payload))
    //     })
    // }

    // 创建登录页面
    public async createLoginWin() {
        await this.createWin(
            {
                label: 'login',
                title: '登录页面',
                url: '/#/login',
                width: 350,
                height: 530,
            }
        );
    }

    // 关闭main窗口
    public static async closeMainWin() {
        await appWindow.close()
    }

    // 最大化main窗口
    public static async maximizeMainWin() {
        await appWindow.maximize();
    }

    // 取消最大化main窗口
    public static async unmaximizeMainWin() {
        await appWindow.unmaximize();
    }

    // 最小化main窗口
    public static async minimizeMainWin() {
        await appWindow.minimize();
    }

    // 隐藏main窗口
    public static async miniWin() {
        await appWindow.hide()
    }

    // 创建mini模式的窗口
    public async createMini() {
        await this.createWin(
            {
                label: 'login',
                title: '登录页面',
                url: '/#/login',
                width: 150,
                height: 50,
            }
        );
    }
}

export default Windows