/*
* 描述: 从 localstorage 获取数据或者更新数据
* key: 获取 localstorage 中的key
* defaultValue: 默认值
*/
import { Ref, ref } from "vue";

export default function <T>(key: string,): [Ref<T | null>, (d: T) => void, () => void, () => void] {
    let data: Ref<T | null> = ref(null)
    let cacheStr = localStorage.getItem(key);

    try {
        // 如果解析不出来直接赋值null
        data.value = cacheStr ? JSON.parse(cacheStr) : null;
    } catch (_e) {
        // console.log(_e);
        // 删除已存在的
        localStorage.removeItem(key);
    }

    // 重新赋值
    const setData = (d: T) => {
        data.value = d;
        localStorage.setItem(key, JSON.stringify(d));
    }

    // 删除本地值跟缓存数据
    const deleteData = () => {
        data.value = null;
        localStorage.removeItem(key);
    }

    // 根据外部绑定的更新缓存数据
    const updateData = () => {
        localStorage.setItem(key, JSON.stringify(data.value));
    }

    return [data, setData, deleteData, updateData]

}