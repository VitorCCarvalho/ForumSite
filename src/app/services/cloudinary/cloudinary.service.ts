import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  getImage(imgId: string): Observable<CloudinaryImage>{
    return new Observable<CloudinaryImage>((resp) => {
      resp.next(this.cld.image(imgId))
    }
      
    )
  }

  uploadImg(imageFile: File, imgName: string): Observable<string>{
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'dfrgtzpm');

    return this.http.post<string>(this.url, formData)
  }

}
