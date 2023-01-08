import { Suggestion } from "../models/suggestion.model";

export interface SuggestionState{
    idSearching: boolean;
    error: string;
    searchResult : Suggestion[];
    isSuccess: boolean;
}