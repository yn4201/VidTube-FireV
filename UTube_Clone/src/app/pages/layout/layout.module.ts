import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { HomeModule } from './home/home.module';
import { PlayModule } from './play/play.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileModule } from './profile/profile.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HomeModule,
    PlayModule,
    ProfileModule,
    FontAwesomeModule

   
  ]
})
export class LayoutModule { }
