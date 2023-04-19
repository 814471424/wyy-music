import { defineStore } from 'pinia'

export const usePlayListStore = defineStore('playlist', {
  state: (): {
    // 播放列表
    list: Common.songX[]
  } => ({
    list: JSON.parse(localStorage.getItem('playlist') ?? '[]')
  }),
  actions: {
    // 追加一个进入播放列表
    addOne(value: Common.songX) {
      if (this.list.findIndex((v) => v.id == value.id) == -1) {
        if (this.list.length >= 50) {
          this.list.pop()
        }
        this.list = [value, ...this.list]
        this.list.join

        localStorage.setItem('playlist', JSON.stringify(this.list))
      }
    },
    // 清空播放列表
    removeAll() {
      this.list = [];
      localStorage.setItem('playlist', JSON.stringify(this.list))
    },
    // 清空并放入新的数组  
    replaceAll(values: Common.songX[]) {
      this.list = values;
      localStorage.setItem('playlist', JSON.stringify(this.list))
    },
    removeOne(id: number | string) {
      let index = this.list.findIndex((v) => v.id == id);
      if (index != -1) {
        this.list.splice(index, 1)
        localStorage.setItem('playlist', JSON.stringify(this.list))
      }
    }
  }
})