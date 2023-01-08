import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.action';
import { User } from "../models/user.model";
import { UserState } from "../states/user.state";

const inititalState: UserState = {
    error: "",
    userIdToSub: "",
    user: <User>{}
}

export const userReducer = createReducer(
    inititalState,
    ////////////////////////////////////////////////////////
    on(UserActions.subscribe, (state, action) => {
        let newState = {

            ...state,
            userIdToSub: action.userIdToSub,
        }
        console.log(action.type);
        return newState;
    }),
    on(UserActions.subscribeSuccess, (state, action) => {
        let newState = {
            ...state,
            userIdToSub: "",
            user: action.user
        }
        console.log(action.type);
        return newState;
    }),
    on(UserActions.subscribeFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error
        }
        console.log(action.type);
        return newState;
    }),

    ////////////////////////////////////////////////////////
    on(UserActions.unSubscribe, (state, action) => {
        let newState = {
            ...state,
            userIdToSub: action.userIdToSub,
            isAuthenticated: true,
        }
        console.log(action.type);
        return newState;
    }),
    on(UserActions.unSubscribeSuccess, (state, action) => {
        let newState = {
            ...state,
            userIdToSub: "",
            isAuthenticated: false,
            user: action.user
        }
        console.log(action.type);
        return newState;
    }),
    on(UserActions.unSubscribeFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error
        }
        console.log(action.type);
        return newState;
    }),
)
 


