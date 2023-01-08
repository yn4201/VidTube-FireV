import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { HttpService } from "../services/http.service";
import * as CommentActions from "../actions/comment.action";

@Injectable()
export class CommentEffects {
    constructor(private action$: Actions, private httpService: HttpService) { }

    writeCommentEffect = createEffect(() => this.action$.pipe(
        ofType(CommentActions.WriteComment),
        switchMap((action) => this.httpService.writeComment(action.idToken, action.videoId, action.comment)),
        map(() => CommentActions.WriteCommentSuccess()),
        catchError(error => of(CommentActions.WriteCommentFailure({ error: error }))),
    ))

    getCommentsEffect = createEffect(() => this.action$.pipe(
        ofType(CommentActions.GetAllCommentsFromThatVideo),
        switchMap((action) => this.httpService.getAllCommentsFromThatVideo(action.videoId)),
        map((commentList) => {
            commentList.forEach(async comment => {
                let total = new Date().getTime() - new Date(comment.createdAt).getTime();
                let hourConvert = Math.round((Math.floor((total) / 1000)) / 3600);
                if (hourConvert > 24) {
                    if (hourConvert < 48) {
                        comment.timeConvert = Math.round(hourConvert / 24).toString() + " day ago";
                    } else {
                        comment.timeConvert = Math.round(hourConvert / 24).toString() + " days ago";
                    }
                }
                else if (hourConvert >= 1) {
                    if (hourConvert == 1) {
                        comment.timeConvert = hourConvert.toString() + " hour ago";
                    }
                    else {
                        comment.timeConvert = hourConvert.toString() + " hours ago";
                    }
                }
                else if (hourConvert < 1) {
                    let minuteConvert = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                    if (minuteConvert < 1) {
                        comment.timeConvert = Math.round((Math.floor((total) / 1000))).toString() + " seconds ago";
                    } else {
                        if (minuteConvert == 1) {
                            comment.timeConvert = minuteConvert.toString() + " minute ago";
                        }
                        else {
                            comment.timeConvert = minuteConvert.toString() + " minutes ago";
                        }
                    }
                }
            });
            return CommentActions.GetAllCommentsFromThatVideoSuccess({ commentList })
        }),
        catchError(error => of(CommentActions.GetAllCommentsFromThatVideoFailure({ error: error }))),
    ))
}