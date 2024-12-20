import { ModalService } from './../../../services/modal/modal.service';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from './../../user/user.service';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Login } from '../../user/login';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  animations: [
    trigger('enterTrigger',[
      state('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [style({opacity: '0'}), animate('500ms')])
    ])
  ]
})
export class LoginDialogComponent implements OnInit{
  formLogin = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  })

  @Output() chosenDialog = new EventEmitter()

  status: string = "idle"

  ngOnInit(){
  }

  constructor(private userService: UserService,
              private storageService: StorageService,
              private modalService: ModalService){}

  onSubmit(){
    if(this.formLogin.controls['user'].value != null && this.formLogin.controls['password'].value != null){
      this.status = "loading"
      this.loginUser(this.formLogin.controls['user'].value, this.formLogin.controls['password'].value)
    }
     
  }

  loginUser(user: string, password: string){
    var login : Login = {
      username : user? user : "",
      password : password? password: ""
    }
    this.userService.login(login).subscribe((httpResponse: any) => {
      this.storageService.setItem("jwt-session", httpResponse.response);
      this.status = "completed"
    }, 
    err => {
      console.log(err.error)
    })
  }

  switchDialog(modalTemplate: TemplateRef<any>){
    this.modalService.open("signup").subscribe()  
  }


}
