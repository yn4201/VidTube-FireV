import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloudMessageService } from './services/cloud-message.service';
import { AuthState } from './states/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UTube_Clone';
  // idToken$ = this.store.select(state => state.auth.idToken);
  constructor(
    // private cms: CloudMessageService, private store: Store<{auth: AuthState}>
    ){

  }
  ngOnInit(): void {
    // this.idToken$.subscribe((token) => {
    //   if(token && token != ""){
    //     this.cms.requestPermission();
    //     this.cms.listen();
    //   }
    // })
  }

}
