import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginDialogComponent, ModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
