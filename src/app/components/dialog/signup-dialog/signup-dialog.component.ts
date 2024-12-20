import { UserService } from './../../user/user.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUp } from '../../user/signup';
import { StorageService } from '../../../services/storage/storage.service';
import { confirmPasswordValidator } from './confirm-password.validator';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.scss',
  animations: [
    trigger('enterTrigger',[
      state('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [style({opacity: '0'}), animate('500ms')])
    ])
  ]
})
export class SignupDialogComponent {
  username = new FormControl(null,  [Validators.required])
  name = new FormControl(null,  [Validators.required])
  email = new FormControl(null,  [Validators.required, Validators.email])
  password = new FormControl(null,  [Validators.required])
  repassword = new FormControl(null,  [Validators.required])


  formSignup = new FormGroup({
    username: this.username,
    name: this.name,
    email: this.email,
    password: this.password,
    repassword: this.repassword
  },
    {validators: confirmPasswordValidator}
  )

  @Output() chosenDialog = new EventEmitter()

  status: string = "idle"

  constructor(private userService: UserService, private storageService: StorageService){}

  onSubmit(){
    if(this.formSignup.controls['username'].value != null &&
      this.formSignup.controls['name'].value != null &&
      this.formSignup.controls['email'].value != null && 
      this.formSignup.controls['password'].value != null &&
      this.formSignup.controls['repassword'].value != null
    ){
      this.status = "loading"
      this.signupUser(this.formSignup.controls['username'].value, this.formSignup.controls['name'].value, this.formSignup.controls['email'].value, this.formSignup.controls['password'].value, this.formSignup.controls['repassword'].value)

    }
     
  }

  signupUser(username: string, name: string, email: string, password: string, repassword: string){
    var signup: SignUp = {
      username: username,
      name: name,
      email: email,
      password: password,
      repassword: repassword
    }
    this.userService.criar(signup).subscribe((response) => {
      this.status = "completed"
    })

  }

  switchDialog(){
    this.chosenDialog.emit("login")
  }

}
