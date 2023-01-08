import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { InteractService } from 'src/app/services/interact.service';
import { AuthState } from 'src/app/states/auth.state';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from "../../../../../actions/video.action";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // animations: [
  //   trigger('slidein', [
  //     transition(':enter', [
  //       // when ngif has true
  //       style({ transform: 'translateX(-10%)' }),
  //       animate(250, style({ transform: 'translateX(1%)' }))
  //     ]),
  //     transition(':leave', [
  //       // when ngIf has false
  //       animate(250, 
  //       style({ transform: 'translateX(1%)' }))
  //     ])
  //   ])
  // ]
})
export class MainComponent implements OnInit {
  isMinimize: boolean = true;
  videoList$ = this.store.select((state) => state.video.videoList)
  token$ = this.store.select((state) => state.auth.idToken)
  constructor(
    private router : Router,
    private interactService: InteractService,
    private changeDetector: ChangeDetectorRef,
    // private authService: AuthService,
    public httpService: HttpService,
    private store: Store<{ video: VideoState, auth: AuthState }>,
    // private auth: Auth
  ) {
    this.store.dispatch(VideoActions.getAllVideos());
  }
  async ngOnInit(): Promise<void> {
    this.interactService.listenToggleMenu((isCheck) => {
      this.isMinimize = isCheck
      // console.log(this.isMinimize)
      this.changeDetector.detectChanges()
    });

  }

  playVideo(id: string) {
    // console.log(id);
    // this.router.navigate([`play/video/${id}`]);
    window.location.href = `./play/video/${id}`
  }

  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user.png";
  }

}
