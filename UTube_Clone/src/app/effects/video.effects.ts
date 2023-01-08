import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "../services/http.service";
import * as VideoActions from "../actions/video.action";
import { catchError, of, switchMap, map } from "rxjs";

@Injectable()
export class VideoEffects {

    constructor(private action$: Actions, private httpService: HttpService) {
    }

    getAllVideoInfoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.getAllVideos),
        switchMap(() => this.httpService.getAllVideos()),
        map(videoList => {
            videoList.forEach(async video => {
                let total = new Date().getTime() - new Date(video.createdAt).getTime();
                video.hour = Math.round((Math.floor((total) / 1000)) / 3600);
                if (video.hour > 24) {
                    video.day = Math.round(video.hour / 24);
                }
                if (video.hour < 1) {
                    video.minute = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                    if (video.minute < 1) {
                        video.second = Math.round((Math.floor((total) / 1000)));
                    }
                }
            });
            return VideoActions.getAllVideosSuccess({ videoList: videoList })
        }),
        catchError(error => of(VideoActions.getAllVideosFailure({ error }))),
    ))

    getAllVideoInfosForUserEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.getAllVideosForUser),
        switchMap((action) => this.httpService.getAllVideosForUser(action.idToken)),
        map(videoList => {
            videoList.forEach(async video => {
                let total = new Date().getTime() - new Date(video.createdAt).getTime();
                let hourConvert = Math.round((Math.floor((total) / 1000)) / 3600);
                if (hourConvert > 24) {
                    if (hourConvert < 48) {
                        video.timeConvert = Math.round(hourConvert / 24).toString() + " day ago";
                    } else {
                        video.timeConvert = Math.round(hourConvert / 24).toString() + " days ago";
                    }
                }
                else if (hourConvert >= 1) {
                    if (hourConvert == 1) {
                        video.timeConvert = hourConvert.toString() + " hour ago";
                    }
                    else {
                        video.timeConvert = hourConvert.toString() + " hours ago";
                    }
                }
                else if (hourConvert < 1) {
                    let minuteConvert = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                    if (minuteConvert < 1) {
                        video.timeConvert = Math.round((Math.floor((total) / 1000))).toString() + " seconds ago";
                    } else {
                        if (minuteConvert == 1) {
                            video.timeConvert = minuteConvert.toString() + " minute ago";
                        }
                        else {
                            video.timeConvert = minuteConvert.toString() + " minutes ago";
                        }
                    }
                }
            });
            return VideoActions.getAllVideosForUserSuccess({ videoList: videoList })
        }),
        catchError(error => of(VideoActions.getAllVideosForUserFailure({ error }))),
    ))

    loadingVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.loadVideo),
        switchMap((state) => this.httpService.getOneVideo(state._id)),
        map(video => {
            let total = new Date().getTime() - new Date(video.createdAt).getTime();
            let hourConvert = Math.round((Math.floor((total) / 1000)) / 3600);
            if (hourConvert > 24) {
                if (hourConvert < 48) {
                    video.timeConvert = Math.round(hourConvert / 24).toString() + " day ago";
                } else {
                    video.timeConvert = Math.round(hourConvert / 24).toString() + " days ago";
                }
            }
            else if (hourConvert >= 1) {
                if (hourConvert == 1) {
                    video.timeConvert = hourConvert.toString() + " hour ago";
                }
                else {
                    video.timeConvert = hourConvert.toString() + " hours ago";
                }
            }
            else if (hourConvert < 1) {
                let minuteConvert = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                if (minuteConvert < 1) {
                    video.timeConvert = Math.round((Math.floor((total) / 1000))).toString() + " seconds ago";
                } else {
                    if (minuteConvert == 1) {
                        video.timeConvert = minuteConvert.toString() + " minute ago";
                    }
                    else {
                        video.timeConvert = minuteConvert.toString() + " minutes ago";
                    }
                }
            }
            return VideoActions.loadVideoSuccess({ video: video })
        }),
        catchError(error => of(VideoActions.loadVideoFailure({ error }))),
    ))

    getEntireVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.getEntireVideos),
        switchMap((state) => this.httpService.getEntireVideo(state._id)),
        map(videoList => {
            videoList.forEach(async video => {
                let total = new Date().getTime() - new Date(video.createdAt).getTime();
                let hourConvert = Math.round((Math.floor((total) / 1000)) / 3600);
                if (hourConvert > 24) {
                    if (hourConvert < 48) {
                        video.timeConvert = Math.round(hourConvert / 24).toString() + " day ago";
                    } else {
                        video.timeConvert = Math.round(hourConvert / 24).toString() + " days ago";
                    }
                }
                else if (hourConvert >= 1) {
                    if (hourConvert == 1) {
                        video.timeConvert = hourConvert.toString() + " hour ago";
                    }
                    else {
                        video.timeConvert = hourConvert.toString() + " hours ago";
                    }
                }
                else if (hourConvert < 1) {
                    let minuteConvert = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                    if (minuteConvert < 1) {
                        video.timeConvert = Math.round((Math.floor((total) / 1000))).toString() + " seconds ago";
                    } else {
                        if (minuteConvert == 1) {
                            video.timeConvert = minuteConvert.toString() + " minute ago";
                        }
                        else {
                            video.timeConvert = minuteConvert.toString() + " minutes ago";
                        }
                    }
                }
            });
            return VideoActions.getEntireVideosSuccess({ videoList: videoList })
        }),
        catchError(error => of(VideoActions.getEntireVideosFailure({ error }))),
    ))

    uploadVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.uploadVideo),
        switchMap((action) => {
            const videoFormData: FormData = new FormData();
            videoFormData.append('video', action.videoFile);
            return this.httpService.uploadVideo(action.idToken, videoFormData, action.video_id)
        }),
        map((file) => {
            return VideoActions.uploadVideoSuccess({ filePath: file.filename });
        }),
        catchError(error => of(VideoActions.uploadVideoFailure({ error }))),
    ))

    createVideoInfoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.createVideoInfo),
        switchMap((state) => this.httpService.createVideoInfo(state.idToken, state.video)),
        map((videoInfo) => {
            return VideoActions.createVideoInfoSuccess({ videoInfo });
        }),
        catchError(error => of(VideoActions.createVideoInfoFailure({ error }))),
    ))

    countVideoViewsEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.countViewsVideo),
        switchMap((state) => this.httpService.countVideoViews(state._id)),
        map((views) => {
            return VideoActions.countViewsVideoSuccess({ views: views });
        }),
        catchError(error => of(VideoActions.countViewsVideoFailure({ error }))),
    ))

    likeVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.likeVideo),
        switchMap((state) => this.httpService.likeVideo(state.idToken, state._id)),
        map((likes) => {
            return VideoActions.likeVideoSuccess({ likes: likes });
        }),
        catchError(error => of(VideoActions.likeVideoFailure({ error }))),
    ))

    unlikeVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.unlikeVideo),
        switchMap((state) => this.httpService.unlikeVideo(state.idToken, state._id)),
        map((likes) => {
            return VideoActions.unlikeVideoSuccess({ likes: likes });
        }),
        catchError(error => of(VideoActions.unlikeVideoFailure({ error }))),
    ))

    dislikeVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.dislikeVideo),
        switchMap((state) => this.httpService.dislikeVideo(state.idToken, state._id)),
        map((dislikes) => {
            return VideoActions.dislikeVideoSuccess({ dislikes: dislikes });
        }),
        catchError(error => of(VideoActions.dislikeVideoFailure({ error }))),
    ))

    undislikeVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.undislikeVideo),
        switchMap((state) => this.httpService.undislikeVideo(state.idToken, state._id)),
        map((dislikes) => {
            return VideoActions.undislikeVideoSuccess({ dislikes: dislikes });
        }),
        catchError(error => of(VideoActions.undislikeVideoFailure({ error }))),
    ))

    deleteVideoEffect = createEffect(() => this.action$.pipe(
        ofType(VideoActions.deleteVideo),
        switchMap((state) => this.httpService.deleteVideo(state.idToken, state._id,state.path)),
        map((success) => {
            return VideoActions.deleteVideoSuccess({ success });
        }),
        catchError(error => of(VideoActions.deleteVideoFailure({ error }))),
    ))
}