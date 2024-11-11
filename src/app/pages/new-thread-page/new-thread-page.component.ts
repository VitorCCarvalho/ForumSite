import { FthreadImage } from './../../components/fthread/fthread-image/fthread-image';
import { CloudinaryService } from './../../services/cloudinary/cloudinary.service';
import { Component, OnInit } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/ng';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ModalService } from '../../services/modal/modal.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FThread } from '../../components/fthread/fthread';
import { FThreadService } from '../../components/fthread/fthread.service';
import { StorageService } from '../../services/storage/storage.service';
import { jwtDecode } from 'jwt-decode';
import { FthreadImageService } from '../../components/fthread/fthread-image/fthread-image.service';
import { Router } from '@angular/router';
import { forkJoin, Observable, switchMap, from, mergeMap, toArray } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-new-thread-page',
  standalone: true,
  imports: [ CloudinaryModule, ReactiveFormsModule],
  templateUrl: './new-thread-page.component.html',
  styleUrl: './new-thread-page.component.scss'
})
export class NewThreadPageComponent implements OnInit{
  sample!: CloudinaryImage

  title = new FormControl(null,  [Validators.required])
  text = new FormControl(null,  [Validators.required])
  imgs: File[] = []

  forumId!: number
  newFThreadId: number = -1

  formNewThread = new FormGroup({
    title: this.title,
    text: this.text,
  })

  imagePreviews: (string | ArrayBuffer | null)[] = [];
  constructor(
    private cloudinaryService: CloudinaryService,
    private modalService: ModalService,
    private fthreadService: FThreadService,
    private storageService: StorageService,
    private fThreadImageService: FthreadImageService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    var forumId = this.route.snapshot.queryParamMap.get('forumId');
    if(forumId){
      this.forumId = +forumId
    }
  }

  
  onSubmit(){
    if(this.formNewThread.controls['title'].value != null &&
      this.formNewThread.controls['text'].value
    ){
      var userSession = this.storageService.getItem("jwt-session")
      if(userSession != null){
        var decodedSession: any = jwtDecode(userSession)
        var userId = decodedSession.id
        var newFThread: FThread ={
          forumID: this.forumId,
          name: this.formNewThread.controls['title'].value,
          text: this.formNewThread.controls['text'].value,
          userId: userId
        }

        this.fthreadService.criar(newFThread).pipe(
          switchMap((resp1) => 
            this.uploadImages(resp1)
          ),
          switchMap((resp2) =>
            this.createFThreadImageDB(resp2)
          ),
        ).subscribe((resp) => {
          this.router.navigate(['/fthread-page'], {queryParams: {fthreadId: this.newFThreadId}})
        })

        
      }
      
      
    }
  }


  uploadImages(fThread : FThread): Observable<string[]>{
    if(fThread.id != null){
      this.newFThreadId = fThread.id
      const observables: Observable<any>[] = []
      
      if(this.imgs.length > 0){
        return from(this.imgs).pipe(
          
          mergeMap((img) => 
            this.cloudinaryService.uploadImg(img, "fthread_" + this.newFThreadId)
          ),
          toArray()
        )
      }
      

      // if(this.imgs.length > 0){
      //   for(let i = 0; i < this.imgs.length; i ++){
      //     let imgName = "fthread_" + this.newFThreadId + "_img_" + i.toString();
      //     let observable = this.cloudinaryService.uploadImg(this.imgs[i], imgName)

      //     observables.push(observable)
      //   }
      //   return forkJoin(observables)
      // }
     
    }
  
    return new Observable()
  }

  createFThreadImageDB(imgsIds: any[]): Observable<any>{
    if(imgsIds.length > 0){
      return from(imgsIds).pipe(
          
        
        mergeMap((imgId) => 
          this.fThreadImageService.criar(this.createFThreadImgType(imgId.public_id))
        ),
        toArray()
      )
    }
    return new Observable()
  }
 
  createFThreadImgType(imgId: string): FthreadImage{
    let fThreadImage: FthreadImage = {
      fThreadId: this.newFThreadId,
      imgId: imgId
    }
    return fThreadImage 
  }

  onFileSelected(event: any) {
    const input = (event.target as HTMLInputElement)
    const files = input.files;

    if (files) {
      this.imagePreviews = [];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
          const reader = new FileReader();

          this.imgs.push(file)

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if(e.target != null){
              this.imagePreviews.push(e.target.result);
            }
          };

          reader.readAsDataURL(file);
        } else {
          input.value = ''
          this.modalService.open("warning", "Um dos arquivos selecionados não é uma imagem, ou possui mais do que 5MB")
        }
      });
    }
  }

}
