export interface IFeedbackMedia{
    video?: Object;
    picture?: Object;
}

export interface IFeedBack{
    commentsCount: number;
    created: string;
    experience: string;
    id: string;
    vendorId: string;
    userId: string;
    userName: string;
    rate: number;
    advantage?: string;
    disadvantage?: string;
    dislikeCount?: number;
    likeCount?: number;
    note?: string;
    userPicturePath?: string;
    media?: IFeedbackMedia;
}

export interface INote {
    commentsCount: number;
    created: string;
    dislikeCount: number;
    id: string;
    likeCount: number;
    note: string;
    userId: string;
    userName: string;
    userPicturePath: string;
}