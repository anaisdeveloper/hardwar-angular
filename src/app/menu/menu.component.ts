import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  

  constructor(public authenticationService: AuthenticationService) { 
    
  }

  ngOnInit(): void {

    
    
  }



  isAdmin(){
    return this.authenticationService.isAdmin();
  }


  isUser(){
    return this.authenticationService.isUser();
  }
  isAuthenticated(){
    
    return this.authenticationService.isAuthenticated();
  }


  logout(){
    this.authenticationService.logout();
  }
  
}
