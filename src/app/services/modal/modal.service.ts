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

  open(dialog: string){
    if(this.modalComponentRef){
      console.log("entrou")
      this.closeModal();
    }

    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalComponent)

    
    // const contentViewRef = modalRef.createEmbeddedView(null)
    this.modalComponentRef =  modalComponentFactory.create(this.injector, [
      // contentViewRef.rootNodes,
    ])

    this.appRef.attachView(this.modalComponentRef.hostView);
    const domElem = (this.modalComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    this.modalComponentRef.instance.chosenDialog = dialog
    document.body.appendChild(domElem);


    

    // this.modalComponentRef.hostView.detectChanges()

    // this.document.body.appendChild(this.modalComponentRef.location.nativeElement)

    

    this.modalComponentRef.instance.closeEvent.subscribe(() => this.closeModal());

    this.modalNotifier = new Subject()

    return this.modalNotifier?.asObservable()

  }
    
  closeModal(){
    this.modalNotifier?.complete();
    this.modalComponentRef.destroy();
  }
}
