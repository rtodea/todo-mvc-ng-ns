import firebase = require('nativescript-plugin-firebase');
import { getString, setString } from 'application-settings';

export class BackendService {
  fbConnection;

  init() {
    console.log('BackendService.init -- before');
    firebase.init({
      persist: false,
      storageBucket: 'gs://todomvc-b1fbe.appspot.com',
    }).then(
      (instance) => {
        this.fbConnection = instance;
        console.log('BackendService.init', 'firebase.init done');
      },
      (error) => {
        console.log('BackendService.init', 'firebase.init error: ' + error);
      }
    );
  }

  public isLoggedIn(): boolean {
    return !!getString('token');
  }

  public get token(): string {
    return getString('token');
  }

  public set token(theToken: string) {
    setString('token', theToken);
  }

  auth() {
    return this.fbConnection.auth();
  }
}