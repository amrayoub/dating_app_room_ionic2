import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Facebook, NativeStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  firstName: string;
  lastName: String;
  email: string;
 
  constructor(fname: string, lname: string, email: string) {
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
  errorMessage: string;

  constructor(
    public http: Http
  ){}
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let url = 'http://Sample-env.3idefupayb.us-west-2.elasticbeanstalk.com/loginUser';
        var postData = {
            email: credentials.email,
            password: credentials.password
        };
        this.http.post(url, postData).map(res => res.json()).subscribe((data)=> {
          console.log(data);         
          if(data.status == true){
            var userData = (data.data);
            console.log(userData);
            this.currentUser = new User(userData.firstName, userData.lastName, userData.email);
            NativeStorage.setItem('user',{
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
            }).then(function(){
              observer.next(true);
              observer.complete();
            }), function(error){
              console.log(error);
              observer.next(false);
              observer.complete();
            }
          }else {
            this.errorMessage = data.message;
            observer.next(false);
            observer.complete();
          }
        });
      });
    }
  }

  public register(credentials) {
    if (credentials.firstName === null || credentials.lastName === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let url = 'http://sample-env.3idefupayb.us-west-2.elasticbeanstalk.com/postUser';
        var postData = {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password
        };
        this.http.post(url, postData).map(res => res.json()).subscribe((data)=> {
          console.log(data);
          if(data.status == true){
            var userData = data.data;
            console.log(userData);
            this.currentUser = new User(userData.firstName, userData.lastName, userData.email);
            NativeStorage.setItem('user',{
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
            }).then(function(){
              observer.next(true);
              observer.complete();
            }), function(error){
              console.log(error);
              observer.next(false);
              observer.complete();
            }
          }else {
            observer.next(false);
            observer.complete();
          }
        });
      });
    }
  }
  public signUpWithFB() {
    var _this = this;
    let permissions = new Array();
    permissions = ["email", "public_profile"];

    return Observable.create(observer => {
      Facebook.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array();

        //Getting name and gender properties
        Facebook.api("/me?fields=name,gender, email", params)
        .then(function(user) {
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          //now we have the users info, let's save it in the NativeStorage
          let nameAry = user.name.split(' ');
          let firstName = nameAry[0];
          let lastName = nameAry[1];
          _this.currentUser = new User(firstName, lastName, user.email);
          
          NativeStorage.setItem('user',{
            firstName: firstName,
            lastName: lastName,
            gender: user.gender,
            picture: user.picture
          }).then(function(){
            observer.next(true);
            observer.complete();
          }), function(error){
            console.log(error);
            observer.next(false);
            observer.complete();
          }
        });
      }, function(error){
        console.log(error);
        observer.next(false);
        observer.complete();
      });
    });
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
