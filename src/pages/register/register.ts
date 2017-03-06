import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../../pages/home/home';
 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  FB_APP_ID: number = 934457456607903;
  createSuccess = false;
  loading: Loading;
  registerCredentials = {firstName: '', lastName: '', email: '', password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    // Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }
 
  public register() {
    if(this.isInvalidateEmail(this.registerCredentials.email)){
      this.showPopup("Error", "You have entered an invalid email address!");
    }else{
      this.showLoading();
      this.auth.register(this.registerCredentials).subscribe(success => {
        this.loading.dismiss();
        if (success) {
          this.createSuccess = true;
          this.nav.setRoot(HomePage);
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    }
  }
  
  public signUpWithFB() {
    this.auth.signUpWithFB().subscribe(success => {
      if(success){
        this.nav.setRoot(HomePage);
      }else{
        this.showPopup("Error", "Problem signup with facebook account.");
      }
    })
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
            //  this.nav.popToRoot();
            this.nav.setRoot(HomePage);
           }
         }
       }
     ]
    });
    alert.present();
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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