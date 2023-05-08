# 仿网易云客户端(vue3+tauri)


#### 环境依赖
node: `v14.15.4+`
rust: `v1.56.0+`

#### 运行步骤
1. 启动网易云api服务[https://github.com/Binaryify/NeteaseCloudMusicApi.git]
2. 下载node跟rust[https://www.rust-lang.org/]
3. 修改环境变量 `VUE_APP_BASE_API`
4. 运行 `npm run dev` 或者 `cargo tauri dev`

#### 项目界面
> 电脑端

![](https://gitee.com/qq814471424/wyy-music/raw/master/src/assets/cover_pc.jpg)

> 手机端

![](https://gitee.com/qq814471424/wyy-music/raw/master/src/assets/cover_mobile.png)


#### 目录结构描述
```
├── dist               
├── public      
├── src
│ ├── api               // 请求网易云相关的api跟数据结构
│ ├── assets            // 静态资源
│ ├── components        // 整体组件跟通用组件
│ ├── hooks             // hooks测试
│ ├── router            // 项目路由
│ ├── store             // 状态管理
│ ├── utils             // 通用方法
│ ├── views             // 项目页面
│ ├── windows           // 启动tauri相关窗口
│ ├── App.vue           
│ ├── main.ts
│ └── styles.css
├── src-tauri           // tauri主要代码
├── .env.development    // 开发环境
├── .env.production     // 生产环境
├── update.json         // tauri客户端更新文件
```

#### 项目代办事项
- [x] 扫描登录
- [ ] 搜索
- [ ] 发现音乐 -> 个性推荐
- [ ] 发现音乐 -> 专属定制
- [x] 发现音乐 -> 歌单
- [x] 发现音乐 -> 排行榜
- [x] 发现音乐 -> 歌手
- [x] 发现音乐 -> 最新音乐
- [ ] 视频
- [ ] 私人FM
- [ ] 本地于下载 -> 下载管理(客户端才有)
- [x] 本地于下载 -> 本地音乐(客户端才有)
- [x] 我的歌单
- [ ] 最近播放
- [x] 播放列表
