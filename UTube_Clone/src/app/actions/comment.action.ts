import { createAction, props } from "@ngrx/store";
import { Comment } from "../models/comment.model";

export const WriteComment = createAction('[Comment] Write Comment',props<{idToken: string, videoId: string, comment: Comment}>())
export const WriteCommentSuccess = createAction('[Comment] Write Comment Success')
export const WriteCommentFailure = createAction('[Comment] Write Comment Failure',props<{error: string}>())

export const GetAllCommentsFromThatVideo = createAction('[Comment] Get All Comments From That Video',props<{videoId: string}>())
export const GetAllCommentsFromThatVideoSuccess = createAction('[Comment] Get All Comments From That Video Success',props<{commentList : Comment[]}>())
export const GetAllCommentsFromThatVideoFailure = createAction('[Comment] Get All Comments From That Video Failure',props<{error: string}>())