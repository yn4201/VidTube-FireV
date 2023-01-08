import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import * as AuthActions from "../actions/auth.action";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authService: AuthService, private httpService: HttpService) { }

    loginEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.login),
        switchMap(() => this.authService.login()),
        map(idToken => AuthActions.loginSuccess({ idToken: idToken })),
        catchError(error => of(AuthActions.loginFailure({ error: error }))),
    ))

    logoutEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this.authService.SignOut()),
        map(() => AuthActions.logoutSuccess()),
        catchError(error => of(AuthActions.logoutFailure({ error: error }))),
    ))

    getIdTokenEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.getIdToken),
        switchMap(() => this.authService.getIdToken()),
        map((idToken) => AuthActions.getIdTokenSuccess({ idToken })),
        catchError(error => of(AuthActions.getIdTokenFailure({ error: error }))),
    ))

    getUserIdEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.getUserId),
        switchMap((state) => this.httpService.getUserId(state.idToken)),
        map((_id) => AuthActions.getUserIdSuccess({ _id })),
        catchError(error => of(AuthActions.getUserIdFailure({ error: error }))),
    ))

    saveRegistTokenEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.saveRegistToken),
        switchMap((state) => 
        {
           return this.httpService.sendUidForm(state.idToken,state.uidForm)
        }),
        map((tempList) => {
            return AuthActions.saveRegistTokenSuccess({tokenList: tempList})
        }),
        catchError(error => of(AuthActions.saveRegistTokenFailure({ error: error }))),
    ))

    getUserInfoEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.getUserInfo),
        switchMap((state) => this.httpService.getUserInfo(state.idToken)),
        map((user) => AuthActions.getUserInfoSuccess({ user })),
        catchError(error => of(AuthActions.getUserInfoFailure({ error: error }))),
    ))

    
    getUserToSubListEffect = createEffect(() => this.action$.pipe(
        ofType(AuthActions.getUserToSubList),
        switchMap((state) => this.httpService.getUserSubList(state.idToken)),
        map((subList) => AuthActions.getUserToSubListSuccess({ subList })),
        catchError(error => of(AuthActions.getUserToSubListFailure({ error: error }))),
    ))
 
}