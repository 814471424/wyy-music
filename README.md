# 仿网易云客户端(vue3+tauri)


#### 环境依赖
node: `v14.15.4+`
rust: `v1.56.0+`

#### 运行步骤
1. 启动网易云api服务[https://github.com/Binaryify/NeteaseCloudMusicApi.git]
2. 下载node跟rust[https://www.rust-lang.org/]
3. 修改环境变量 `VUE_APP_BASE_API`
4. 运行 `npm run dev` 或者 `cargo tauri dev`

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