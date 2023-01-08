import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success', props<{ idToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const getIdToken = createAction('[Auth] Get idToken');
export const getIdTokenSuccess = createAction('[Auth] Get idToken Success', props<{ idToken: string }>());
export const getIdTokenFailure = createAction('[Auth] Get idToken Failure', props<{ error: string }>());

export const getUserId = createAction('[Auth] Get UserId', props<{ idToken: string }>());
export const getUserIdSuccess = createAction('[Auth] Get UserId Success', props<{ _id: string }>());
export const getUserIdFailure = createAction('[Auth] Get UserId Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());

export const saveRegistToken = createAction('[Auth] Save Regist Token',props<{idToken: string, uidForm: any}>());
export const saveRegistTokenSuccess = createAction('[Auth] Save Regist Token Success',props<{tokenList : Object}>());
export const saveRegistTokenFailure = createAction('[Auth] Save Regist Token Failure', props<{ error: string }>());

export const getUserInfo = createAction('[User] Get User Info', props<{ idToken: string}>());
export const getUserInfoSuccess = createAction('[User] Get User Info Success',props<{ user: User }>());
export const getUserInfoFailure = createAction('[User] Get User Info Failure', props<{ error: string }>());

export const getUserToSubList = createAction('[User] Get User To Sub List', props<{ idToken: string}>());
export const getUserToSubListSuccess = createAction('[User] Get User To Sub List Success',props<{ subList: User[] }>());
export const getUserToSubListFailure = createAction('[User]  Get User To Sub List Failure', props<{ error: string }>());