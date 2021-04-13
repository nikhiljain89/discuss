export interface Comment extends Reply {
    replyComment?: Reply[];
}

interface Reply {
    id: number;
    count?: number;
    comment?: string;
    currentDate?: Date;
    user?: string;
    photo?: string;
}
