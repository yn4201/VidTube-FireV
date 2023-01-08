import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from '../../../../../actions/video.action';
@Component({
  selector: 'app-delete-notify-dialog',
  templateUrl: './delete-notify-dialog.component.html',
  styleUrls: ['./delete-notify-dialog.component.scss']
})
export class DeleteNotifyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteNotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { video_id: string, idToken: string, path: string },
    private store: Store<{ video: VideoState }>
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

  delete() {
    this.store.dispatch(VideoActions.deleteVideo({ idToken: this.data.idToken, _id: this.data.video_id, path: this.data.path }))
    this.dialogRef.close('Spaghetti');
  }

}
