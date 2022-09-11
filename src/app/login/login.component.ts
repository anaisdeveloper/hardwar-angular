import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;

  
  constructor(private authenticationService: AuthenticationService,
    private router : Router) { }

  ngOnInit(): void {
    
  }

 
  userForm: FormGroup =  new FormGroup({
    
    username : new FormControl(''),
    password : new FormControl(''),
    
  });



  /**
   * on login
   * 
   */
  onSubmit(){
   
   
    this.user = this.userForm.value;
   
    this.authenticationService.login(this.user)
    .subscribe({
      next:(response: any)=>{
        
      let jwt = response.headers.get('Authorization');
      this.authenticationService.saveToken(jwt);
      //this.authenticationService.saveUsername(this.userForm.controls.username.value);
     this.authenticationService.authenticateUser(this.user)
     .subscribe({
       next: (data:User)=>{
         
        this.router.navigateByUrl('/home');
       }
     })
     
     
        
      }, error:(err) =>{
        
        console.log(err);
      }
    })
  }


  // onSubmit2(){
   
   
  //   this.user = this.userForm.value;
   
  //   this.authenticationService.loginToServer(
  //     this.userForm.controls.username.value,
  //     this.userForm.controls.password.value)
  //   .subscribe({
  //     next:(response: any)=>{
        
  //     let jwt = response.headers.get('Authorization');
  //     this.authenticationService.saveToken(jwt);
  //    this.router.navigateByUrl('/home');
        
  //     }, error:(err) =>{
        
  //       console.log(err);
  //     }
  //   })
  // }
  
}
