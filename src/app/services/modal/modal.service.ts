import { Component, ComponentFactoryResolver, Inject, Injectable, Injector, Query, TemplateRef } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { LoginDialogComponent } from '../../components/dialog/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifier?: Subject<string>

  constructor(
    private resolver: ComponentFactoryResolver, 
    private injector: Injector,
  @Inject(DOCUMENT) private document: Document){}

  open(modalRef: TemplateRef<any>, contentComp: any){
    var test = Query.

    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalComponent)
    const contentViewRef = modalRef.createEmbeddedView(null)
    const modalComponent =  modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ])

    modalComponent.hostView.detectChanges()

    this.document.body.appendChild(modalComponent.location.nativeElement)

    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());

    this.modalNotifier = new Subject()

    return this.modalNotifier?.asObservable()

  }
    
  closeModal(){
    this.modalNotifier?.complete();
  }
}
