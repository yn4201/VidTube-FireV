import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './pages/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndDirective } from './pages/layout/profile/directives/dnd.directive';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { Store, StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { ClickOutsideDirective } from './pages/layout/components/navbar/clickOutside.directive';
import { HttpClientModule } from '@angular/common/http';
import { VideoEffects } from './effects/video.effects';
import { videoReducer } from './reducers/video.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faCoffee,faChess  } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare,faCheckSquare as farCheckSquare,} from '@fortawesome/free-regular-svg-icons';
import {faStackOverflow,faGithub,faMedium,faAmazon} from '@fortawesome/free-brands-svg-icons';
import { AuthState } from './states/auth.state';
import * as AuthActions from '../app/actions/auth.action';
import { state } from '@angular/animations';
import { UserEffects } from './effects/user.effects';
import { userReducer } from './reducers/user.reducer';
import { commentReducer } from './reducers/comment.reducer';
import { CommentEffects } from './effects/comment.effects';
import { suggestionReducer } from './reducers/suggestion.reducer';
import { SuggestionEffects } from './effects/suggestion.effect';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ClickOutsideDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({ auth: authReducer, video: videoReducer, user: userReducer, cmt: commentReducer, suggest : suggestionReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([AuthEffects, VideoEffects, UserEffects, CommentEffects, SuggestionEffects]),
    HttpClientModule,
    

  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  idToken$ = this.store.select((state) => state.auth.idToken);
  constructor(
    // library: FaIconLibrary,
    private store: Store<{auth : AuthState}>
    ) {
      this.store.dispatch(AuthActions.getIdToken());
      this.idToken$.subscribe((idToken) => {
        if(idToken && idToken != ""){
          this.store.dispatch(AuthActions.getUserId({ idToken: idToken }))
        }
      })
    // library.addIcons(
    //   faSquare,
    //   faCheckSquare,
    //   farSquare,
    //   farCheckSquare,
    //   faStackOverflow,
    //   faGithub,
    //   faMedium,
    //   faCoffee,
    //   faAmazon,
    //   faChess
    // );
  }
}
