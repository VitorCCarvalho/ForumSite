import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Query, TemplateRef } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifier?: Subject<string>
  private modalComponentRef!: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver, 
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document){}

  open(dialog: string, message?: string){
    if(this.modalComponentRef){
      this.closeModal();
    }

    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalComponent)

    this.modalComponentRef =  modalComponentFactory.create(this.injector)

    this.appRef.attachView(this.modalComponentRef.hostView);
    const domElem = (this.modalComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    this.modalComponentRef.instance.chosenDialog = dialog
    if(message){
      this.modalComponentRef.instance.message = message
    }
    document.body.appendChild(domElem);

    this.modalComponentRef.instance.closeEvent.subscribe(() => this.closeModal());

    this.modalNotifier = new Subject()

    return this.modalNotifier?.asObservable()

  }
    
  closeModal(){
    this.modalNotifier?.complete();
    this.modalComponentRef.destroy();
  }
}
