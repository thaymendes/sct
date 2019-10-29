import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private fAuth: AngularFireAuth
  ) { }


  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      this.fAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      this.fAuth.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(this.fAuth.auth.currentUser){
        this.fAuth.auth.signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
  
   userDetails(){
     return this.fAuth.auth.currentUser;
   }

   getAuth(){
    return this.fAuth.auth;
  }


}
