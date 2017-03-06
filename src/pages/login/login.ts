import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
  public login() {
    if(this.isInvalidateEmail(this.registerCredentials.email)){
      this.showPopup("Error", "You have entered an invalid email address!");
    }else{
      this.showLoading();
      this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.loading.dismiss();
          this.nav.setRoot(HomePage);
        } else {
          this.showError(this.auth.errorMessage);
        }
      },
      error => {
        this.showError(error);
      });
    }
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK'
       }
     ]
    });
    alert.present();
  }
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  private isInvalidateEmail(mail){  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
      return (false);  
    }else {
      return (true);  
    }
  }
}