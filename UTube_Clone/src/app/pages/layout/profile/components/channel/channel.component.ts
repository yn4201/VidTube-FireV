import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from '../../../../../actions/video.action';
import * as AuthActions from '../../../../../actions/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNotifyDialogComponent } from '../delete-notify-dialog/delete-notify-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Video } from 'src/app/models/video.model';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  idToken : string = "";
  isCurrent: number = 0;
  
  isDelete$ = this.store.select(state => state.video.isDelete);
  idToken$ = this.store.select(state => state.auth.idToken);
  
  author$ = this.store.select(state => state.auth.user);
  videoList$ = this.store.select(state => state.video.videoList);
  videoAvailableList : Video[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ video: VideoState, auth: AuthState }>,
    public dialog: MatDialog) {
    this.idToken$.subscribe((token) => {
      if (token && token != "") {
        this.idToken = token;
        this.store.dispatch(AuthActions.getUserInfo({ idToken: token }));
        this.store.dispatch(VideoActions.getAllVideosForUser({ idToken: token }));
      }
    })
  }

  ngOnInit(): void {
    //check when user cmt video 
    this.isDelete$.subscribe((value) => {
      if (value == true) {
        this.store.dispatch(VideoActions.getAllVideosForUser({ idToken: this.idToken }));
        this._snackBar.open('Delete Video Success', 'Close', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      }
    })

    this.videoList$.subscribe((videoList) => {
      if(videoList.length > 0){
        this.videoAvailableList.length = 0;
        for(let i = 0; i < videoList.length; i++){
          if(videoList[i].isHidden == false){
            this.videoAvailableList.push(videoList[i])
          }
        }
      }
    })
  }

  detectIsCurrent(number: number) {
    this.isCurrent = number;
  }

  handleError(e: any) {
    // console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }

  playVideo(id: string) {
    // console.log(id);
    // this.router.navigate([`play/video/${id}`]);
    window.location.href = `./play/video/${id}`
  }

  openDeleteNotifyDialog(video_id:string,path:string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteNotifyDialogComponent, {
      data: {
        video_id,
        idToken: this.idToken,
        path
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
