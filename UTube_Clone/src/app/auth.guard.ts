import { Injectable, resolveForwardRef } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, ResolveEnd, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private authService: AuthService, private router: Router, private auth: Auth) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return new Promise((resolve,reject) => {
    //   this.authService.isUserLoggedIn
    //   .subscribe((value) => {
    //     if(value){
    //       console.log(value)
    //       resolve(value)
    //     }else{
    //       console.log(value)
    //       resolve(value);
    //       this.router.navigate(["./"]);//nếu chưa đăng nhập chuyển sang trang home
    //       alert('Vui lòng đăng nhập tài khoản để có thể truy cập vào trang!!!');
    //     }
    //   })
    // })
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (value) => {
        if (value) {
          // console.log(value)
          resolve(true);
        } else {
          // console.log(value)
          resolve(false);
          this.router.navigate(["./"]);//nếu chưa đăng nhập chuyển sang trang login
          // alert('Vui lòng đăng nhập tài khoản để có thể truy cập vào trang!!!');
        }
      })
    })
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
