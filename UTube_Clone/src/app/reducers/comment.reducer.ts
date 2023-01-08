import { createReducer, on } from "@ngrx/store";
import * as CommentActions from "../actions/comment.action"
import { CommentState } from "../states/comment.state";

const inititalState: CommentState = {
    isLoading: false,
    isSuccess: false,
    commentList: [],
    idToken: "",
    error: "",
    _id: "",
}

export const commentReducer = createReducer(
    inititalState,
    on(CommentActions.WriteComment,(state,action) => {
        console.log(action.type);
        const newState = {

            ...state,
            isSuccess : false,
            isLoading : true,
            idToken : action.idToken,
            _id : action.videoId
        }
        return newState
    }),
    on(CommentActions.WriteCommentSuccess,(state,action) => {
        console.log(action.type);
        const newState = {

            ...state,
            isSuccess: true,
            isLoading : false,
            idToken : "",
            _id : ""
        }
        return newState
    }),
    on(CommentActions.WriteCommentFailure,(state,action) => {
        console.log(action.error);
        const newState = {
            ...state,
            error : action.error,
            isLoading : false,
            idToken : "",
            _id : ""
        }
        return newState
    }),

    on(CommentActions.GetAllCommentsFromThatVideo,(state,action) => {
        console.log(action.type);
        const newState = {
            ...state,
            isLoading : true,
            _id : action.videoId
        }
        return newState
    }),
    on(CommentActions.GetAllCommentsFromThatVideoSuccess,(state,action) => {
        console.log(action.type);
        const newState = {
            ...state,
            isLoading : false,
            _id : "",
            commentList: action.commentList
        }
        return newState
    }),
    on(CommentActions.GetAllCommentsFromThatVideoFailure,(state,action) => {
        console.log(action.error);
        const newState = {
            ...state,
            error : action.error,
            isLoading : false,
            _id : ""
        }
        return newState
    }),
)
