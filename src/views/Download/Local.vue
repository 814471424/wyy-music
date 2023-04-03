<template>
  <div class="local-message">
    <div class="local-name">本地共有{{ musicList?.length ?? 0 }}首歌曲</div>
    <!-- 选择相关的目录 -->
    <div class="local-file">
      <el-button text @click="alterSelectFile">
        选择目录
      </el-button>
    </div>
  </div>

  <!-- 所有的按钮 -->
  <div class="local-button-all">
    <div>
      <el-button-group class="local-button-bofang">
        <el-button type="danger" class="iconfont wyy-caret-right button-left">
          播放全部
        </el-button>
        <el-button type="danger" class="iconfont wyy-tianjia button-right" />
      </el-button-group>
      <el-button class="iconfont wyy-refresh button-pipei" :loading="buttonLoad" @click="findMp3ByFiles">匹配音乐</el-button>
    </div>
    <div>
      <el-input v-model="searchText" class="w-50 m-2 local-input-search" placeholder="搜索本地音乐" :suffix-icon="Search"
        clearable />
    </div>
  </div>

  <!-- 本地音乐列表 -->
  <el-table :data="filterMusicList" @row-dblclick="tableDbClick" stripe style="width: 100%" size="small"
    :highlight-current-row=true tooltip-effect="light">
    <el-table-column type="index" :index="(index: number) => index + 1" />
    <el-table-column prop="name" sortable label="音乐标题" :show-overflow-tooltip=true />
    <el-table-column prop="path" label="本地路径" :show-overflow-tooltip=true />
  </el-table>

  <!-- 选择目录相关的模态框 -->
  <el-dialog v-model="dialogVisible" :append-to-body="true" :modal="false" :center="true" :destroy-on-close="true"
    width="470px" :z-index=9999 title="" draggable>
    <div style="text-align: center;" class="div-no-select">
      <h3 style="margin-top: -20px;">选择本地音乐文件夹</h3>
    </div>
    <span class="div-no-select" style="font-size: 10px;">以下文件为本地音乐目录。</span>
    <div>
      <el-checkbox-group v-model="selectFilesData">
        <el-checkbox v-for="file in searchFiles" :key="file" :label="file">{{
          file
        }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="confirmSelectFiles" round>确认</el-button>
        <el-button @click="checkFile()" round>
          添加文件夹
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { Ref, onMounted, ref } from "vue"
import { open } from '@tauri-apps/api/dialog'
import { Search } from '@element-plus/icons-vue'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useMainStore } from '../../store/index';
import { computed } from "@vue/reactivity";
import { playOne, fileToSongx } from '../../utils/player'

const mainStore = useMainStore();
// 查找的主要文件格式
const suffix = ["mp3", "wav", "flac", "ogg", "m4a"]
// 搜索到的本地歌曲列表
let [musicList, setMusicList] = useLocalStorage<FileEntry[]>('musicList');
// 查找到的本地文件夹地址数组
let [searchFiles, _setSearchFiles, _delSearchFiles, updSearchFiles] = useLocalStorage<string[]>('searchFiles');
// 选中的地址
let [selectFiles, setSelectFiles] = useLocalStorage<string[]>('selectFiles');
let selectFilesData = ref<string[]>([]);
let dialogVisible = ref(false)
// 按键是否存在loading状态
let buttonLoad = ref(false)
// 搜索文本的值
let searchText: Ref<String> = ref("");
let filterMusicList = computed(() =>
  musicList.value?.filter(
    (data) =>
      !searchText.value ||
      data.name?.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase())
  )
)

function checkFile() {
  // 查找文件夹
  open({
    directory: true,
    multiple: true,
  }).then((res) => {
    // 如果查找到的
    if ((res?.length ?? 0) > 0) {
      let fileName = res![0];
      // 查找文件路径是否存在
      if ((searchFiles.value ?? []).indexOf(fileName) == -1) {
        // 如果找到文件设置并更新
        searchFiles.value ? searchFiles.value.push(res![0]) : searchFiles.value = [res![0]]
        updSearchFiles()
      }
    }
  });
}

// 弹出选择目录的框的事件
function alterSelectFile() {
  // 初始化选中的列
  selectFilesData.value = selectFiles.value ?? []
  dialogVisible.value = true
}

// 确认时候的事件
function confirmSelectFiles() {
  // 重新设置选中的列
  setSelectFiles(selectFilesData.value)
  dialogVisible.value = false
}

// 根据目录路径数组查找所有相关的文件
async function findMp3ByFiles() {
  buttonLoad.value = true;
  let list: FileEntry[] = [];

  // 从缓存中查找需要搜索的路径
  for (const n of selectFiles.value ?? []) {
    let entries = await readDir(n);

    let cacheList = entries
      .filter((data) => {
        return !data.children;
      }) // 去除文件夹
      .filter((res) => { // 去除不知名的文件
        let result = false;
        let expandName = res.name?.substring(res.name.lastIndexOf(".") + 1) ?? "";
        if (suffix.indexOf(expandName.toLowerCase()) > -1) {
          result = true;
        }
        return result;
      })
      .map((data) => {  // 文件名去除后缀
        data.name = data.name?.substring(0, data.name.lastIndexOf(".") - 1) ?? '';
        return data
      })

    // 合并
    list = [...list, ...cacheList];
  }

  // 直接赋值给音乐列表的缓存
  setMusicList(list);
  buttonLoad.value = false;
}

function tableDbClick(row: FileEntry) {
  if (row.path && row.name) {
    playOne(fileToSongx(row.name, row.path))
    // mainStore.setUrl("https://stream.localhost/" + row.path)
  }
}

onMounted(() => {
})
</script>

<style lang="less" scoped>
.local-message {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .local-name {
    font-size: 14px;
    padding-left: 3px;
  }

  .local-file {
    button {
      color: #507daf
    }
  }
}


.local-button-all {
  display: flex;
  justify-content: space-between;
  margin: 25px 0 25px 0;

  .local-button-bofang {
    .button-left {
      border-radius: 20px 0 0 20px;
    }

    .button-right {
      border-radius: 0 20px 20px 0;
    }

  }

  .button-pipei {
    border-radius: 20px;
    margin-left: 10px;
  }

  .local-input-search {
    :deep(.el-input__wrapper) {
      border-radius: 20px;
      background-color: #f7f7f7;
    }
  }
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-direction: column;
}

// 相关文章[https://blog.csdn.net/AzeShinja/article/details/122310015]
:deep(.el-input__suffix) {
  // 处理前缀图标不垂直居中的问题
  height: auto;
  font-size: 20px;

  &-inner {
    flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
    display: flex;
  }
}

:v-deep(.el-icon-search) {
  position: relative;

  &:hover {
    color: rgb(109, 109, 240);
  }

  &::after {
    content: '';
    width: 1px;
    height: 50%;
    left: -1.5px;
    position: absolute;
    top: 25%;
    background-color: rgb(233, 233, 233);
  }
}
</style>
