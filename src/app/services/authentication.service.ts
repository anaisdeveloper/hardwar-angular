import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
 

jwt: string = '';
username: string;
roles: string;
authenticatedUser : any;
  


  constructor(private http: HttpClient) { }


  login(data): Observable<any>{
    let url : string = 'https://authentication-service-badi.herokuapp.com/login';//'http://localhost:8080/login';
   
    
    return this.http.post(url,  data, {observe:'response'});

  }

  
  
  saveToken(_jwt:string){
    localStorage.setItem('token', _jwt );
    this.jwt = _jwt;
    this.parseJWT();
    

  }
  parseJWT() {
    if (this.jwt != null) {

      let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    
   
  
   if (objJWT != null) {
    this.username = objJWT.sub;
    this.roles = objJWT.roles;
    
   }
      
    }
   

  }

  isAdmin(){
    if (this.jwt != null) {
      
      return this.roles.indexOf('ADMIN')>=0;
    }
    return false;
  }

  isUser(){
    if (this.jwt != null) {
    return this.roles.indexOf('USER')>=0;
    }
    return false;
  }

  isAuthenticated(){
    
  
      if (localStorage.getItem('token') == undefined) {
        return false;
      } else {
        return true;
      }

    
  }
  authenticateUser(user: any): Observable<User>{
   this.authenticatedUser = user;
  localStorage.setItem('username', user.username);
  localStorage.setItem('roles', this.roles);

    
   
    return of(user);
  }
  
  
  loadToken(){
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }


  logout() {
    this.initParams();

  }
  initParams() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
    
  }

  



  /**
   * LOGIN TO SERVER
   */

  loginToServer(username: string, password: string):Observable<any>{
    let url : string = 'https://authentication-service-badi.herokuapp.com/login';//'http://localhost:8080/login';
    
    let data = {
      "username" : username,
      "password" : password
    }
    return of(this.http.post(url,  data, {observe:'response'}));

  }
}
