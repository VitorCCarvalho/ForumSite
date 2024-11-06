import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private readonly url = 'https://api.cloudinary.com/v1_1/dpee5cimt/image/upload'

  cld = new Cloudinary({
    cloud: {
      cloudName: 'dpee5cimt'
    }
  })

  constructor(private http: HttpClient) {}

  getSample(){
    return this.cld.image('cld-sample')
  }

  getFThreadImage(fthreadId: number){
    let imgName = "fthread_"
  }

  uploadImg(imageFile: File, imgName: string): Observable<string>{
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'dfrgtzpm');

    return this.http.post<string>(this.url, formData)
  }

}
