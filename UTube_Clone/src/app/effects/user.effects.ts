import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { HttpService } from "../services/http.service"
import * as UserActions from '../actions/user.action'

@Injectable()
export class UserEffects {
    constructor(private action$: Actions, private httpService: HttpService) { }

    SubscribeEffect = createEffect(() => this.action$.pipe(
        ofType(UserActions.subscribe),
        switchMap((state) => this.httpService.subscribeUser(state.idToken, state.userIdToSub)),
        map((user) => UserActions.subscribeSuccess({user})),
        catchError(error => of(UserActions.subscribeFailure({ error: error }))),
    ))

    UnSubscribeEffect = createEffect(() => this.action$.pipe(
        ofType(UserActions.unSubscribe),
        switchMap((state) => this.httpService.unsubscribeUser(state.idToken, state.userIdToSub)),
        map((user) => UserActions.unSubscribeSuccess({user})),
        catchError(error => of(UserActions.unSubscribeFailure({ error: error }))),
    ))
}

