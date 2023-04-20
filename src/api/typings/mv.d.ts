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
}