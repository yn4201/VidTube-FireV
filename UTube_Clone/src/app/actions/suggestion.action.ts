import { createAction, props } from "@ngrx/store";
import { Suggestion } from "../models/suggestion.model";

export const searching = createAction('[Suggestion] Searching',props<{keyword:string}>());
export const searchingSuccess = createAction('[Suggestion] Searching Success', props<{ searchResult: Suggestion[] }>());
export const searchingFailure = createAction('[Suggestion] Searching Failure', props<{ error: string }>());