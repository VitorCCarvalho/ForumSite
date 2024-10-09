import { LoginDialogComponent } from './../dialog/login-dialog/login-dialog.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SignupDialogComponent } from '../dialog/signup-dialog/signup-dialog.component';
import { WarningDialogComponent } from '../dialog/warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})
export class ModalComponent implements OnInit{
  show: boolean = false

  @ViewChild('innerComponent', { read: ViewContainerRef, static: true }) innerComponent!: ViewContainerRef;

  @Output() closeEvent = new EventEmitter();

  chosenDialog!: string

  message!: string

  constructor(private elementRef: ElementRef){}

  ngOnInit(): void {
    this.loadInnerComponent();

  }

  loadInnerComponent(): void {
    this.innerComponent.clear()

    switch(this.chosenDialog){
      case "login":
        let login = this.innerComponent.createComponent(LoginDialogComponent);
        login.instance.chosenDialog.subscribe((resp) => {
          this.chosenDialog = resp;
          this.loadInnerComponent()
        })
        break;
      case "signup":
        let signup = this.innerComponent.createComponent(SignupDialogComponent);
        signup.instance.chosenDialog.subscribe((resp) => {
          this.chosenDialog = resp;
          this.loadInnerComponent()
        })
        break;
      case "warning":
        const teste = this.innerComponent.createComponent(WarningDialogComponent);
        // this.innerComponent.createComponent(WarningDialogComponent);
        if(this.message){
          teste.instance.message = this.message
        }
        break;
      default:
        this.innerComponent.createComponent(WarningDialogComponent)
    }
    
  }

  changeInnerComponent(dialog: string){
    this.chosenDialog = dialog
    this.loadInnerComponent()
  }

  close(): void{
    this.elementRef.nativeElement.remove()
    this.closeEvent.emit()
  }
}
