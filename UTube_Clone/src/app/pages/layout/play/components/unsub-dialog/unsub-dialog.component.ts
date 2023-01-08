import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthState } from 'src/app/states/auth.state';
import * as UserActions from '../../../../../actions/user.action';

@Component({
  selector: 'app-unsub-dialog',
  templateUrl: './unsub-dialog.component.html',
  styleUrls: ['./unsub-dialog.component.scss']
})
export class UnsubDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnsubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { author: User, idToken: string },
    private store: Store
  ) {

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Pizza');
  }

  unsubscribe() {
    this.store.dispatch(UserActions.unSubscribe({idToken: this.data.idToken, userIdToSub: this.data.author._id}))
    this.dialogRef.close('Spaghetti');
  }
}
