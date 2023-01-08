import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Store } from '@ngrx/store';
import { AuthState } from '../states/auth.state';
import { environment } from 'src/environments/environment';
import * as AuthActions from '../actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class CloudMessageService {

  idToken$ = this.store.select(state => state.auth.idToken);
  constructor( private messaging: Messaging, private store: Store<{ auth: AuthState }>) {

  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.retrieveToken();
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
      }
    })
  }

  retrieveToken() {
    getToken(this.messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('registToken:' + currentToken);
        this.idToken$.subscribe((token) => {
          if (token && token != "") {
            let uidForm = {
              reToken: currentToken
            }
            this.store.dispatch(AuthActions.saveRegistToken({ idToken: token, uidForm }))
          }

        })

      } else {
        // Show permission request UI
        alert('No registration token available. Request permission to generate one.')
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.onBackgroundMessage` handler.
  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }

}
