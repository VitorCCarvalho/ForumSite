import { SignUp } from './../user/signup';
import { UserService } from './../user/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { confirmPasswordValidator } from './confirm-password.validator';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {

  constructor(private userService: UserService, private sidebar: SidebarComponent){}

  textResponse: string = ""

  username = new FormControl('', [Validators.required])
  user = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl<string>('', [Validators.required])
  repassword = new FormControl<string>('', [Validators.required])

  signupForm: FormGroup = new FormGroup({
    username: this.username,
    user: this.user,
    email: this.email,

    password: this.password,
    repassword: this.repassword,
  },
    { validators: [confirmPasswordValidator]}
);



onSubmit(){
  console.log("entrou")

  var signup: SignUp = {
    name: this.user.value? this.user.value : "",
    username: this.username.value? this.username.value : "",
    email: this.email.value? this.email.value : "",
    password: this.password.value? this.password.value : "",
    repassword: this.repassword.value? this.repassword.value : ""
  }

  this.userService.criar(signup).subscribe((httpResponse: any) => {
    this.textResponse = "Usuário cadastrado"
  }, error =>{
    this.textResponse = "Erro no cadastro"
  })
}

openLogin(){
  this.sidebar.switchDialogSection()
}

}
