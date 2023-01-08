import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from '../../../../../actions/auth.action';

@Component({
  selector: 'app-notify-login',
  templateUrl: './notify-login.component.html',
  styleUrls: ['./notify-login.component.scss']
})
export class NotifyLoginComponent implements OnInit {

  constructor(
    public snackBarRef : MatSnackBarRef<NotifyLoginComponent>,
    private store: Store<{ auth: AuthState }>
    ) { }

  ngOnInit(): void {
    this.snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });
  }

  Close(){
    this.snackBarRef.dismiss();
  }

  Login(){
    this.store.dispatch(AuthActions.login());
  }

}
