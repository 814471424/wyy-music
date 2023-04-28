declare namespace MV {
    // 推荐mv的详细字段
    export interface mvItem {
        id: number
        type: number
        name: string
        copywriter: string
        picUrl: string
        canDislike: boolean
        trackNumberUpdateTime?: number
        duration: number
        playCount: number
        subed: boolean;
        artists: Common.artist[]
        artistName: string
        artistId: number
        alg: string
    }

    // 独家放送(入口列表)详细字段
    export interface privatecontentItem {
        id: number
        url: string
        picUrl: string
        sPicUrl: string
        type: number
        copywriter: string
        name: string
        alg: string
    }

    // mv详细字段
    export interface mvDetail {
        artistId: number
        artistName: string
        artists: Common.artist[]
        briefDesc: string
        brs: Array<{ br: number, point: number, size: number }>
        commentCount: number
        commentThreadId: string
        cover: string
        coverId: number
        coverId_str: string
        desc: string
        duration: null
        id: number
        nType: number
        name: string
        playCount: number
        price?: number
        publishTime: string
        shareCount: number
        subCount: number
        videoGroup: Array<{ id: number, name: string, type: number }>
    }

    export interface videoRecommend {
        // 1 为视频 0 mv 7直播
        type: number
        displayed: boolean
        alg: string | null
        extAlg: string | null
        data: Common.videoDetail
    }
}