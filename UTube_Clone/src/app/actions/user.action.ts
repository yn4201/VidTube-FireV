import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const subscribe = createAction('[User] Subscribe', props<{ idToken: string, userIdToSub: string }>());
export const subscribeSuccess = createAction('[User] Subscribe Success',props<{ user: User }>());
export const subscribeFailure = createAction('[User] Subscribe Failure', props<{ error: string }>());

export const unSubscribe = createAction('[User] Unsubscribe', props<{ idToken: string, userIdToSub: string }>());
export const unSubscribeSuccess = createAction('[User] Unsubscribe Success',props<{ user: User }>());
export const unSubscribeFailure = createAction('[User] Unsubscribe Failure', props<{ error: string }>());

