import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { VideoState } from 'src/app/states/video.state';
import * as AuthActions from 'src/app/actions/auth.action';
import * as UserActions from 'src/app/actions/user.action';
import * as VideoActions from '../../../actions/video.action';
import * as CommentActions from '../../../actions/comment.action';
import { AuthState } from 'src/app/states/auth.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyLoginComponent } from './components/notify-login/notify-login.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubDialogComponent } from './components/unsub-dialog/unsub-dialog.component';
import { UserState } from 'src/app/states/user.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentState } from 'src/app/states/comment.state';
import { HlsService } from 'src/app/services/hls/hls.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  //hls source testing
  source: string = "";

  isBtnHide: boolean = true;
  isRepFormHide: boolean = true;
  commentForm !: FormGroup;
  replyForm !: FormGroup;

  temp_videoId: string = "";
  commentList$ = this.store.select((state) => state.cmt.commentList);
  isSuccess$ = this.store.select((state) => state.cmt.isSuccess);

  user_avatar: string | null = "";
  isSubscribe: boolean = false;

  likeList: Array<string> = [];
  dislikeList: Array<string> = [];
  likes_temp: number = 0;
  dislikes_temp: number = 0;
  isLiked: boolean = false;
  isDisliked: boolean = false;

  entireVideoList$ = this.store.select((state) => state.video.videoList);
  video$ = this.store.select((state) => state.video.videoLoad);
  author: User = <User>{};

  authorVid$ = this.store.select((state) => state.user.user);
  // videoLoad !: Video;

  idToken$ = this.store.select((state) => state.auth.idToken);
  idToken: string = "";
  userId$ = this.store.select((state) => state.auth._id);
  userId: string = "";

  constructor(
    private router: Router,
    private hlsService: HlsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public httpService: HttpService,
    private route: ActivatedRoute,
    public auth: Auth,
    private store: Store<{ video: VideoState, auth: AuthState, user: UserState, cmt: CommentState }>) {

    //get id from the param of the http
    const params: Observable<string> = this.route.params.pipe(map(p => p['id']));
    params.subscribe((videoId) => {
      this.temp_videoId = videoId;
      this.store.dispatch(VideoActions.loadVideo({ _id: videoId }));
      this.store.dispatch(VideoActions.getEntireVideos({ _id: videoId }));
      this.store.dispatch(CommentActions.GetAllCommentsFromThatVideo({ videoId }));
    })

    //get ava for user cmt
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.user_avatar = user.photoURL != null ? user.photoURL : user.photoURL;
      } else {
        this.user_avatar = "";
      }
    });

    //get idtoken from user
    this.idToken$.subscribe((value) => {
      if (value) {
        this.idToken = value;
      } else {
        this.idToken = "";
        this.userId = "";
      }
    })

    //get like and dislike at that time video was play
    this.video$.subscribe((value) => {
      if (value.likes != undefined && value.dislikes != undefined && value.url != undefined) {
        this.source = `https://server.firev.manhvipro.xyz/${value.url}-conv/main.m3u8`
        // this.source = `http://127.0.0.1:5000/1662479356341-523049444.mp4-conv/main.m3u8`
        let audioControl = document.getElementById('video');
        this.hlsService.hls.loadSource(this.source)
        if (audioControl != null) {
          this.hlsService.hls.attachMedia(audioControl as HTMLMediaElement)
        }
        // console.log(this.source);

        this.author = value.owner;
        this.likes_temp = value.likes;
        this.dislikes_temp = value.dislikes;
        this.likeList = value.likeList;
        this.dislikeList = value.dislikeList;
        // console.log(`dislike: ${this.dislikes_temp} - like: ${this.likes_temp}`);
      }
    })
  }

  async ngOnInit(): Promise<void> {

    // if(this.source != ""){

    // }

    this.userId$.subscribe((value) => {
      if (value) {

        this.userId = value;
        // console.log(this.userId);

        let tempArr = this.author.subscriberList || [];
        // console.log(tempArr);
        if (tempArr.includes(this.userId)) {
          this.isSubscribe = true;
        }

        //check whenever a user has liked or disliked the video before whwen they login
        if (this.likeList.includes(this.userId)) {
          this.isLiked = true;
        } else if (this.dislikeList.includes(this.userId)) {
          this.isDisliked = true;
        }
      }
    })

    this.authorVid$.subscribe((value) => {
      if (value.subscriberList != undefined) {
        if (value.subscriberList.includes(this.userId)) {
          this.isSubscribe = true;
          this._snackBar.open('Subscribed Confirm', 'Close', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
        } else {
          this.isSubscribe = false;
          this._snackBar.open('Unsubscribed Confirm', 'Close', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
        }
      }
    })

    //catch like and dislike when user logout
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.isLiked = false;
        this.isDisliked = false;
      }
    })

    //comment form
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });

    //reply form
    this.replyForm = this.fb.group({
      content: ['', Validators.required],
    });

    //check when user cmt video 
    this.isSuccess$.subscribe((value) => {
      if (value == true) {
        this.store.dispatch(CommentActions.GetAllCommentsFromThatVideo({ videoId: this.temp_videoId }));
        this._snackBar.open('Comment Success', 'Close', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      }
    })

  }

  ////////////////////////////////////////////////////COMMENT /////////////////////////////////////////////////////////////
  dropCmtBox(e: any) {
    if (e.target.style.borderBottom == "1px solid black") {
      e.target.style.borderBottom = "1px solid #ccc";
    } else {
      e.target.style.borderBottom = "1px solid black";
    }
    this.isBtnHide = false;
  }

  dropRepBox(e: any) {
    if (e.target.style.borderBottom == "1px solid black") {
      e.target.style.borderBottom = "1px solid #ccc";
    } else {
      e.target.style.borderBottom = "1px solid black";
    }
    this.isBtnHide = false;
  }

  comment(videoId: string) {
    this.store.dispatch(CommentActions.WriteComment({ idToken: this.idToken, videoId, comment: this.commentForm.value }));
    this.commentForm.reset(this.commentForm);
  }

  resetCommentForm() {
    this.commentForm.reset(this.commentForm);
    if (!this.commentForm.valid) {
      this.isBtnHide = true;
    }
  }


  //comment index
  replyComment: any[] = []
  replyCmt(i: any) {
    if (this.replyComment[i] == null || this.replyComment[i] == undefined) {
      this.replyComment[i] = true
    } else {
      this.replyComment[i] = !this.replyComment[i]

    }
  }

  resetReplyForm(i: any) {
    this.replyForm.reset(this.replyForm);
    if (!this.replyForm.valid) {
      this.isRepFormHide = true;
    }
    this.replyCmt(i)
  }


  reply(videoId: string, replyTo: string) {
    let form = this.replyForm.value;
    let newForm = {
      ...form,
      replyTo: replyTo
    }
    this.store.dispatch(CommentActions.WriteComment({ idToken: this.idToken, videoId, comment: newForm }));
    this.replyForm.reset(this.replyForm);
  }
  ////////////////////////////////////////////////////COMMENT /////////////////////////////////////////////////////////////


  handleChannelError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user.png";
  }

  handleUserError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }

  playVideo(id: string) {
    // this.router.navigateByUrl(`play/video/${id}`);
    window.location.href = `./play/video/${id}`
  }


  //count time to plus 1 view///////////////////////////////////////////////////////////////////////
  timeOutId: NodeJS.Timeout | undefined = undefined;
  isCount: boolean = false;
  totalTime: number = 0;
  timePlay: number = 0;
  duration: number = 0;

  predictTimeToCount(event: any, videoId: string) {
    this.duration = Math.floor(event.target.duration);
    this.timePlay = Date.now();
    // console.log(`time has played: ${this.totalTime / 1000} s`);
    if (this.totalTime == 0) {
      this.timeOutId = setTimeout(() => {
        if (this.isCount == false) {
          this.video$.subscribe((video) => {
            if (video.owner._id != this.userId) {
              this.isCount = !this.isCount;
              // console.log("+1");
              this.store.dispatch(VideoActions.countViewsVideo({ _id: videoId }));

            }
          })
        }
      }, (this.duration * 0.6) * 1000)
    }
    if (this.totalTime > 0) {
      this.timeOutId = setTimeout(() => {
        if (this.isCount == false) {
          this.video$.subscribe((video) => {
            if (video.owner._id != this.userId) {
              this.isCount = !this.isCount;
              // console.log("+1");
              this.store.dispatch(VideoActions.countViewsVideo({ _id: videoId }));
            }
          })
        }
      }, this.duration * 0.6 * 1000 - this.totalTime)
    }
  }
  resetCountable() {
    if (this.isCount == true) {
      clearTimeout(this.timeOutId);
      this.isCount = !this.isCount;
      this.totalTime = 0;
    } else {
      clearTimeout(this.timeOutId);
      this.totalTime = 0;
    }
  }
  stopCountingTime() {
    clearTimeout(this.timeOutId);
    this.totalTime += Date.now() - this.timePlay;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  likeVideo(videoId: string) {
    if (this.isLiked == false && this.isDisliked == false) {
      this.store.dispatch(VideoActions.likeVideo({ idToken: this.idToken, _id: videoId }));
      this.isLiked = true;
      this.likes_temp += 1;
    } else if (this.isLiked == false && this.isDisliked == true) {
      this.store.dispatch(VideoActions.likeVideo({ idToken: this.idToken, _id: videoId }));
      this.isDisliked = false;
      this.isLiked = true;
      this.likes_temp += 1;
      this.dislikes_temp -= 1;
    } else if (this.isLiked == true && this.isDisliked == false) {
      this.store.dispatch(VideoActions.unlikeVideo({ idToken: this.idToken, _id: videoId }));
      this.isLiked = false;
      this.likes_temp -= 1;
    }
  }

  dislikeVideo(videoId: string) {
    if (this.isLiked == false && this.isDisliked == false) {
      this.store.dispatch(VideoActions.dislikeVideo({ idToken: this.idToken, _id: videoId }));
      this.isDisliked = true;
      this.dislikes_temp += 1;
    } else if (this.isLiked == true && this.isDisliked == false) {
      this.store.dispatch(VideoActions.dislikeVideo({ idToken: this.idToken, _id: videoId }));
      this.isDisliked = true;
      this.isLiked = false;
      this.likes_temp -= 1;
      this.dislikes_temp += 1;
    } else if (this.isLiked == false && this.isDisliked == true) {
      this.store.dispatch(VideoActions.undislikeVideo({ idToken: this.idToken, _id: videoId }));
      this.isDisliked = false;
      this.dislikes_temp -= 1;
    }
    // this.store.dispatch(VideoActions.dislikeVideo({ idToken: this.idToken, _id: videoId }));
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }


  loginToAct() {
    this._snackBar.openFromComponent(NotifyLoginComponent, {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  subscribe() {
    this.store.dispatch(UserActions.subscribe(
      {
        idToken: this.idToken,
        userIdToSub: this.author._id
      }
    ));
  }

  openUnSubDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UnsubDialogComponent, {
      data: {
        author: this.author,
        idToken: this.idToken,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }



}


