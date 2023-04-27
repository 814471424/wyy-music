declare namespace Comment {
    export interface CommentDetail {
        beReplied: repliedDetail[]
        commentId: number
        commentLocationType: number
        content: string
        contentResource?: string
        decoration: {}
        expressionUrl?: string
        grade?: string
        ipLocation: Common.ipLocation
        liked: boolean
        likedCount: number
        needDisplayTime: boolean
        owner: boolean
        parentCommentId: number
        pendantData?: string
        repliedMark?: string
        richContent?: number
        showFloorComment?: string
        status: number
        time: number
        timeStr: string
        user: Common.profileInfo
        userBizLevels?: string
    }

    // 回复的信息
    export interface repliedDetail {
        beRepliedCommentId: number
        content: string
        expressionUrl?: string
        ipLocation: Common.ipLocation
        richContent?: string
        status: number
        user: Common.profileInfo
    }
}