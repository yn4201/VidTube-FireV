import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../states/auth.state";
import * as AuthActions from "../actions/auth.action"
import { User } from "../models/user.model";

const inititalState: AuthState = {
    isAuthenticated: false,
    idToken: "",
    error: "",
    _id: "",
    registrationTokensList: {},
    user: <User>{},
    subList: []
}

export const authReducer = createReducer(
    inititalState,

    /////////////////////////////////////////
    on(AuthActions.login, (state, action) => {
        console.log(action.type);
        return state
    }),
    on(AuthActions.loginSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            idToken: action.idToken,
        }
        console.log(action.type);
        return newState;

    }),
    on(AuthActions.loginFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(action.error);
        return newState;
    }),

    ////////////////////////////////////////////////////
    on(AuthActions.getIdToken, (state, action) => {
        console.log(action.type);
        return state;
    }),
    on(AuthActions.getIdTokenSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            idToken: action.idToken,
        }
        console.log(action.type);
        return newState;
    }), on(AuthActions.getIdTokenFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(action.error);
        return newState;
    }),


    //////////////////////////////////////////////////////   
    on(AuthActions.logout, (state, action) => {
        console.log(action.type);
        return state;
    }),
    on(AuthActions.logoutSuccess, (state, action) => {
        let newState = {

            ...state,
            idToken: "",
            isAuthenticated: false,
            _id: "",
            user: <User>{}
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.logoutFailure, (state, action) => {
        let newState = {

            ...state,
            error: action.error
        }
        console.log(action.error);
        return newState;
    }),

    ////////////////////////////////////////////////////////
    on(AuthActions.getUserId, (state, action) => {
        let newState = {

            ...state,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.getUserIdSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: action._id,
            isAuthenticated: true,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.getUserIdFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error
        }
        console.log(action.type);
        return newState;
    }),

    ////////////////////////////////////////////////////////
    on(AuthActions.saveRegistToken, (state, action) => {
        let newState = {
            ...state,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.saveRegistTokenSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            registrationTokensList: action.tokenList
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.saveRegistTokenFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error
        }
        console.log(action.type);
        return newState;
    }),

    ////////////////////////////////////////////////////
    on(AuthActions.getUserInfo, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            idToken: action.idToken,
            isAuthenticated: false,
            user: <User>{}
        };
        return newState
    }),
    on(AuthActions.getUserInfoSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            user: action.user
        }
        console.log(action.type);
        return newState;
    }), on(AuthActions.getUserInfoFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error,
            user: <User>{}
        }
        console.log(newState);
        return state;
    }),

    ////////////////////////////////////////////////////
    on(AuthActions.getUserToSubList, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            idToken: action.idToken,
            isAuthenticated: false,
            subList: []
        };
        return newState
    }),
    on(AuthActions.getUserToSubListSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            subList: action.subList
        }
        console.log(action.type);
        return newState;
    }), on(AuthActions.getUserInfoFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error,
            subList: []
        }
        console.log(newState);
        return state;
    }),



)