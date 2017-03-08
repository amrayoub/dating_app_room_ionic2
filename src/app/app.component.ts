import { Component } from '@angular/core';
import {  NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private auth: AuthService) {
    platform.ready().then(() => {
      // this.auth.isLogged().subscribe(logged => {
      //   if(logged){
      //     this.rootPage = HomePage;
      //   }else{
      //     this.rootPage = LoginPage;
      //   }
      // });
      this.rootPage = LoginPage;
      Splashscreen.hide();
      StatusBar.styleDefault();
    });
  }
}
