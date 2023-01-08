import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [

  { path: '', 
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../layout/home/home.module').then(m => m.HomeModule) },
      { path: 'play/video/:id', loadChildren: () => import('../layout/play/play.module').then(m => m.PlayModule) },
      { 
        canActivate : [AuthGuard],
        path: 'profile', 
        loadChildren: () => import('../layout/profile/profile.module').then(m => m.ProfileModule),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
  // { path: '**', loadChildren: () => import('../layout/home/home.module').then(m => m.HomeModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
