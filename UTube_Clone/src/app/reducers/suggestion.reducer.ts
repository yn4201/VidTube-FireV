import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../states/auth.state";
import * as SuggestionActions from "../actions/suggestion.action"
import { SuggestionState } from "../states/suggestion.state";

const inititalState: SuggestionState = {
    error: "",
    searchResult: [],
    idSearching: false,
    isSuccess: false,
}

export const suggestionReducer = createReducer(
    inititalState,
    on(SuggestionActions.searching,(state,action) => {
        console.log(action.type);
        const newState = {
            ...state,
            isSuccess : false,
            idSearching : true,
        }
        return newState
    }),
    on(SuggestionActions.searchingSuccess,(state,action) => {
        console.log(action.type);
        const newState = {
            ...state,
            isSuccess: true,
            idSearching : false,
            searchResult: action.searchResult
        }
        return newState
    }),
    on(SuggestionActions.searchingFailure,(state,action) => {
        console.log(action.type);
        const newState = {
            ...state,
            error : action.error,
            idSearching : false,
        }
        return newState
    }),
)