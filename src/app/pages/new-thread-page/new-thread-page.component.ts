import { CloudinaryService } from './../../services/cloudinary/cloudinary.service';
import { Component, OnInit } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/ng';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { CloudinaryTransformable } from '@cloudinary/url-gen/assets/CloudinaryTransformable';

@Component({
  selector: 'app-new-thread-page',
  standalone: true,
  imports: [ CloudinaryModule],
  templateUrl: './new-thread-page.component.html',
  styleUrl: './new-thread-page.component.scss'
})
export class NewThreadPageComponent implements OnInit{
  sample!: CloudinaryImage

  imagePreviews: (string | ArrayBuffer | null)[] = [];
  constructor(private cloudinaryService: CloudinaryService){}

  ngOnInit(): void {
    this.sample = this.cloudinaryService.getSample()
  }
  
  onSubmit(){}

  onFileSelected(event: any) {
    const files = (event.target as HTMLInputElement).files;

  if (files) {
    this.imagePreviews = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        const reader = new FileReader();


        reader.onload = (e: ProgressEvent<FileReader>) => {
          if(e.target != null){
            this.imagePreviews.push(e.target.result);
          }
        };

        reader.readAsDataURL(file);
      } else {
        alert('Um dos arquivos selecionados não é uma imagem, ou possui mais do que 5MB');
      }
    });
  }
  }


}
