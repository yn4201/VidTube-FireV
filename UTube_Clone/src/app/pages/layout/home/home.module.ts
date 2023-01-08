import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainComponent } from 'src/app/pages/layout/home/components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
   

  ]
})
export class HomeModule { }
