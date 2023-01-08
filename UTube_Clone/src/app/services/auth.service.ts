import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
// import * as auth from 'firebase/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { BehaviorSubject, from } from 'rxjs';
import { Router } from '@angular/router';
import { signInWithPopup, Auth, GoogleAuthProvider, signOut, authState, onAuthStateChanged, getAuth, idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = "";
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    private router: Router,
    private auth: Auth
  ) {
    /* Saving user data in localstorage when 
   logged in and setting up null when logged out */
    // authState(auth).subscribe((user) => {
    //   if (user) {
    //     this.userData = user
    //     this.isUserLoggedIn.next(true);
    //   }
    // })
  }

  getIdToken() {
    return from(new Promise<string>(async (resolve, reject) => {
      try {
        onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            let user = getAuth().currentUser;
            let idToken = await user!.getIdToken(true)
            resolve(idToken);
          }else{
            resolve("");
          }
        })
      } catch (err) {
        reject(err);
      }
    }));
  }

  //sign in with gg by modular
  login() {
    return from(new Promise<string>(async (resolve, reject) => {
      try {
        let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        // await this.SetUserData(credential.user);
        this.isUserLoggedIn.next(true);
        let idToken = await credential.user.getIdToken();
        resolve(idToken);
      } catch {
        reject('Cannot login with google');
      }
    }));
  }

  // // Sign in with Google
  // async GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     console.log(res);
  //     this.router.navigateByUrl("/");
  //   });
  // }
  // // Auth logic to run auth providers
  // async AuthLogin(provider: any) {
  //   try {
  //     return await this.afAuth.signInWithPopup(provider).then(
  //       (res) => {
  //         this.isUserLoggedIn.next(true);
  //         this.SetUserData(res.user);
  //       })
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  // Sign out
  async SignOut() {
    return from(new Promise<any>(async (resolve, reject) => {
      try {
        await signOut(this.auth);
        // this.isUserLoggedIn.next(false);
        // this.router.navigateByUrl("/");
        // console.log("out")
        resolve("log out");
      }
      catch {
        reject("logout fail");
      }
    }))
  }

}
