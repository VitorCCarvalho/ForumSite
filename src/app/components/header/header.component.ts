import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { ModalComponent } from '../modal/modal.component';
import { SignupDialogComponent } from '../dialog/signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginDialogComponent, SignupDialogComponent, ModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  chosenDialog: string = "login"

  receiveChosenDialog(chosenDialog: string){
    this.chosenDialog = chosenDialog
  }
}
