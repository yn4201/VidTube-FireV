import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { NotifyLoginComponent } from './components/notify-login/notify-login.component';
import { MatButtonModule } from '@angular/material/button';
import { UnsubDialogComponent } from './components/unsub-dialog/unsub-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayComponent,
    NotifyLoginComponent,
    UnsubDialogComponent,


  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class PlayModule { }
