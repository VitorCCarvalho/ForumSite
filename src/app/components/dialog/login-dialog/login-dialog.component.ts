import { UserService } from './../../user/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Login } from '../../user/login';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  formLogin = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private userService: UserService){}

  onSubmit(){
    if(this.formLogin.controls['user'].value != null && this.formLogin.controls['password'].value != null){
      this.loginUser(this.formLogin.controls['user'].value, this.formLogin.controls['password'].value)
    }
     
  }

  loginUser(user: string, password: string){
    var login : Login = {
      username : user? user : "",
      password : password? password: ""
    }
    this.userService.login(login).subscribe((httpResponse: any) => {
      sessionStorage.setItem("jwt-session", httpResponse.response);
      // this.setUserSession();
      // this.textResponse = "Login efetuado!";
      
    }, 
    err => {
      // this.textResponse = err.error;
      console.log("não foi")
    })
  }
}
