import { User } from "./user.model";
import { Video } from "./video.model";
export interface Comment{
    _id: string;
    content: string;
    replyTo: Comment;
    video: Video;
    user: User;
    createdAt: string;
    timeConvert: string;
    commentList: Comment[];
    isHidden: boolean;
}