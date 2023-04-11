// 应用设置的全局
import { defineStore } from 'pinia'

interface Setting {
    savePath?: string
}

export const useSettingStore = defineStore('setting', {
    state: (): {
        setting: Setting
    } => ({
        setting: JSON.parse(localStorage.getItem('setting') ?? '{}')
    }),
    actions: {
        // 设置保存地址
        setSavePath(path: string) {
            this.setting.savePath = path;
            localStorage.setItem('setting', JSON.stringify(this.setting))
        },
    }
})