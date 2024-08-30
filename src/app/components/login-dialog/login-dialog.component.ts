import { SidebarComponent } from './../sidebar/sidebar.component';
import { Component, OnInit } from '@angular/core';
import { Login } from '../user/login';
import { UserService } from '../user/user.service';
import { jwtDecode } from 'jwt-decode';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent{

  textResponse: string = "" 

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private userService: UserService, private sidebar: SidebarComponent){}


  loginUser(user: string | null, password: string | null){
    var login : Login = {
      username : user? user : "",
      password : password? password: ""
    }
    this.userService.login(login).subscribe((httpResponse: any) => {
      sessionStorage.setItem("jwt-session", httpResponse.response);
      this.setUserSession();
      this.textResponse = "Login efetuado!";
      
    }, 
    err => {
      this.textResponse = err.error;
    })
  }

  setUserSession(){
    var jwt = sessionStorage.getItem("jwt-session")
    if(jwt != null){
      var userJson: any = jwtDecode(jwt);

      sessionStorage.setItem("username", userJson.username)
      sessionStorage.setItem("name", userJson.name)

    }
  }

  onSubmit(){
    this.loginUser(this.userFormControl.value, this.passwordFormControl.value)
  }

  openSignUp(){
    this.sidebar.switchDialogSection()
  }

}

