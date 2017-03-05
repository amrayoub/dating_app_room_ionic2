import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor(
    public http: Http
  ){}
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let url = 'http://sample-env-2.us-west-2.elasticbeanstalk.com/loginUser';
        var postData = {
            email: credentials.email,
            password: credentials.password
        };
        this.http.post(url, postData).map(res => res.json()).subscribe((data)=> {
          console.log(data);
          if(data.status == "true"){
            var userData = JSON.parse(data.data);
            console.log(userData);
            this.currentUser = new User(userData.firstName, userData.lastName, userData.email);
            observer.next(true);
          }else {
            observer.next(false);
          }
        });
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.firstName === null || credentials.lastName === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
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
          if(data.status == "true"){
            var userData = JSON.parse(data.data);
            console.log(userData);
            this.currentUser = new User(userData.firstName, userData.lastName, userData.email);
            observer.next(true);
          }else {
            observer.next(false);
          }
        });
        observer.complete();
      });
    }
  }
  public logintemp(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let url = 'http://localhost:3000/api/v1/users/sign_in';
        var postData = {
          email: credentials.email,
          password: credentials.password
        };   
        console.log(postData);
        this.http.post(url, postData).map(res => res.json()).subscribe((data) => {
            console.log(data);
            if ( data.status == 1){
              var userData = JSON.parse(data.data);
              console.log(userData);
              this.currentUser = new User(userData.first_name, userData.last_name, userData.email);
              observer.next(true);
            }else{
              observer.next(false);
            }
            
            observer.complete();
          }); 
      });
    }
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
