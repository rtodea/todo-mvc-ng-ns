import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { User } from './user.model';
import { BackendService } from './backend.service';

@Injectable()
export class LoginService {
  constructor(private backendService: BackendService) { }

  register(user: User) {

    const registerPromise = this.backendService.auth().createUserWithEmailAndPassword(user.email, user.password);

    registerPromise.catch((error) => {
      console.log(error);
    });

    return Observable.fromPromise(registerPromise);
  }

  login(user: User) {
    const loginPromise = this.backendService.auth().signInWithEmailAndPassword(user.email, user.password);
    loginPromise.then((response) => {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });

    return Observable.fromPromise(loginPromise);
  }

  logout() {
    const logoutPromise = this.backendService.auth().signOut();
    logoutPromise.then(() => {
      console.log('logged out');
    }).catch((error) => {
      console.log('could not log out');
      console.log(error);
    });

    return Observable.fromPromise(logoutPromise);
  }

  resetPassword(email) {
    console.log('resetting password for ', email);
    return Observable.fromPromise(Promise.resolve(true));
  }

  isLoggedIn() {
    return this.backendService.isLoggedIn();
  }
}
