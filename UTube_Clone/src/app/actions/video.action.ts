import { createAction, props } from "@ngrx/store";
import { Video } from "../models/video.model";

export const getAllVideos = createAction('[Video] Get All Videos');
export const getAllVideosSuccess = createAction('[Video] Get All Videos Success', props<{ videoList: Video[] }>());
export const getAllVideosFailure = createAction('[Video] Get All Videos Failure', props<{ error: string }>());

export const getAllVideosForUser = createAction('[Video] Get All Videos For User', props<{ idToken: string }>());
export const getAllVideosForUserSuccess = createAction('[Video] Get All Videos For User Suceess', props<{ videoList: Video[] }>());
export const getAllVideosForUserFailure = createAction('[Video] Get All Videos For User Failure', props<{ error: string }>());

export const loadVideo = createAction('[Video] Load Video', props<{ _id: string }>());
export const loadVideoSuccess = createAction('[Video] Load Video Success', props<{ video: Video }>())
export const loadVideoFailure = createAction('[Video] Load Video Failure', props<{ error: string }>());

export const getEntireVideos = createAction('[Video] Get Entire Videos', props<{ _id: string }>());
export const getEntireVideosSuccess = createAction('[Video] Get Entire Videos Success', props<{ videoList: Video[] }>());
export const getEntireVideosFailure = createAction('[Video] Get Entire Videos Failure', props<{ error: string }>());

export const uploadVideo = createAction('[Video] Upload Video', props<{ idToken: string, videoFile : File, video_id: string }>());
export const uploadVideoSuccess = createAction('[Video]  Upload Video Success', props<{ filePath : string }>());
export const uploadVideoFailure = createAction('[Video]  Upload Video Failure', props<{ error: string }>());

export const createVideoInfo = createAction('[Video] Create Video Info', props<{ idToken: string, video: Video }>());
export const createVideoInfoSuccess = createAction('[Video] Create Video Info Success', props<{ videoInfo: Video }>());
export const createVideoInfoFailure = createAction('[Video] Create Video Info Failure', props<{ error: string }>());

export const countViewsVideo = createAction('[Video] Count Views Video', props<{ _id: string }>());
export const countViewsVideoSuccess = createAction('[Video] Count Views Video Success', props<{ views: number }>());
export const countViewsVideoFailure = createAction('[Video] Count Views Video Failure', props<{ error: string }>());

export const likeVideo = createAction('[Video] Like Video', props<{ idToken: string, _id: string }>());
export const likeVideoSuccess = createAction('[Video] Like Video Success', props<{ likes: number }>());
export const likeVideoFailure = createAction('[Video] Like Video Failure', props<{ error: string }>());

export const unlikeVideo = createAction('[Video] Unlike Video', props<{ idToken: string, _id: string }>());
export const unlikeVideoSuccess = createAction('[Video] Unlike Video Success', props<{ likes: number }>());
export const unlikeVideoFailure = createAction('[Video] Unlike Video Failure', props<{ error: string }>());

export const dislikeVideo = createAction('[Video] Dislike Video', props<{ idToken: string, _id: string }>());
export const dislikeVideoSuccess = createAction('[Video] Dislike Video Success', props<{ dislikes: number }>());
export const dislikeVideoFailure = createAction('[Video] Dislike Video Failure', props<{ error: string }>());

export const undislikeVideo = createAction('[Video] Undislike Video', props<{ idToken: string, _id: string }>());
export const undislikeVideoSuccess = createAction('[Video] Undislike Video Success', props<{ dislikes: number }>());
export const undislikeVideoFailure = createAction('[Video] Undislike Video Failure', props<{ error: string }>());

export const deleteVideo = createAction('[Video] Delete Video', props<{ idToken: string, _id: string, path:string }>());
export const deleteVideoSuccess = createAction('[Video] Delete Video Success', props<{ success : boolean }>());
export const deleteVideoFailure = createAction('[Video] Delete Video Failure', props<{ error: string }>());