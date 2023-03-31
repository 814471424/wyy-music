declare namespace Common {
    // 轮播图
    export interface bannerData {
        imageUrl: string,
        typeTitle: string,
        targetId: number,
        targetType: number,
        titleColor: string
    }
}

// 主要响应字段
declare interface responseData {
    code: number,
    message?: string,
}


// 推荐类的数据接口
declare namespace Playlist {
    // 推荐歌单
    export interface playlist {

    }
}

// 用户类相关数据
declare namespace Auth {
}