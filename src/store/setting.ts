// 应用设置的全局
import { defineStore } from 'pinia'
import { PlayRules } from '../api/typings/enum'

interface Setting {
    setting: {
        savePath?: string
        // 播放规则
        playRule?: PlayRules,
    }
}

export const useSettingStore = defineStore('setting', {
    state: (): Setting => {
        return {
            setting: JSON.parse(localStorage.getItem('setting') ?? '{}'),
        }
    },
    actions: {
        // 设置保存地址
        setSavePath(path: string) {
            this.setting.savePath = path;
            localStorage.setItem('setting', JSON.stringify(this.setting))
        },
        // 保存播放规则
        setPlayRule(rule: PlayRules) {
            this.setting.playRule = rule;
            localStorage.setItem('setting', JSON.stringify(this.setting))
        }
    }
})