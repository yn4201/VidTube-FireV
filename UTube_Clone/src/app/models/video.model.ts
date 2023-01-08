import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface Video{
    _id : string;
    title: string;
    description: string;
    photoURL: string;
    url: string;
    likes: number;
    dislikes: number;
    views: number;
    owner: User;
    createdAt: string;
    timeConvert: string;
    hour: number;
    minute: number;
    second: number;
    day: number;
    isHidden: boolean;
    hashtags: string[];
    likeList: string[];
    dislikeList: string[];                      
}