import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InteractService } from 'src/app/services/interact.service';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from '../../../../../actions/auth.action';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(-40%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(250,
          style({ transform: 'translateX(-40%)' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  userId$ = this.store.select((state) => state.auth._id);
  isMinimize: boolean = true;
  idToken$ = this.store.select((state) => state.auth.idToken)
  userInfo$ = this.store.select((state) => state.auth.user);
  userSubList$ = this.store.select((state) => state.auth.subList);
  constructor(private interactService: InteractService, private changeDetector: ChangeDetectorRef, private store: Store<{ auth: AuthState }>) {

  }
  ngOnInit(): void {
    this.interactService.listenToggleMenu((isCheck) => {
      this.isMinimize = isCheck
      // console.log(this.isMinimize)
      // this.changeDetector.detectChanges()
    });

    this.idToken$.subscribe(token => {
      if (token && token != "") {
        this.store.dispatch(AuthActions.getUserInfo({ idToken: token }));
        this.store.dispatch(AuthActions.getUserToSubList({ idToken: token }));
      }
    })

  }
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }


}
