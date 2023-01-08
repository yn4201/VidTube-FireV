import { Comment } from "../models/comment.model";

export interface CommentState{
    commentList: Comment[];
    isSuccess: boolean;
    isLoading: boolean;
    idToken: string;
    error: string;
    _id: string;
}