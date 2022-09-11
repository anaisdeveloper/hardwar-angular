import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'hardware';

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {

    //localStorage.clear();
    if (this.authenticationService.jwt != null) {
      this.authenticationService.loadToken();
    }

   

    
    
  }
  
}
