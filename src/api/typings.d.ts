export interface responseData {
    code: number,
}

declare namespace Common {
    export interface bannerData {
        imageUrl: string,
        typeTitle: string,
        targetId: number,
        targetType: number,
        titleColor: string
    }
}

declare type bannerData111 = {
    imageUrl: string,
    typeTitle: string,
    targetId: number,
    targetType: number,
    titleColor: string
}