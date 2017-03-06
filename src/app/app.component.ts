import { Component } from '@angular/core';
import {  NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        // env.rootPage = HomePage;
        Splashscreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        // this.rootPage = LoginPage;
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }
}
