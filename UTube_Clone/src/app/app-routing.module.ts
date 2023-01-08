import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule) },

  { path: '**', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule)},// '**' có ý nghĩa nếu không có path nào khớp với các path đã khai báo trong routes 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
