import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "../services/http.service";
import * as SuggestionAcitons from "../actions/suggestion.action";
import { catchError, of, switchMap, map } from "rxjs";

@Injectable()
export class SuggestionEffects {

    constructor(private action$: Actions, private httpService: HttpService) {
    }
    searchingEffect = createEffect(() => this.action$.pipe(
        ofType(SuggestionAcitons.searching),
        switchMap((action) => this.httpService.searching(action.keyword)),
        map(searchResult => {      
            return SuggestionAcitons.searchingSuccess({ searchResult: searchResult })
        }),
        catchError(error => of(SuggestionAcitons.searchingFailure({ error }))),
    ))
}