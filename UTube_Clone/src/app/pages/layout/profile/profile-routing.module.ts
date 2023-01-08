import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddComponent } from './components/add/add.component';
import { ChannelComponent } from './components/channel/channel.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'add', component: AddComponent
  },
  {
    path: 'channel', component: ChannelComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatSnackBarModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
