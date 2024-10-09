import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private readonly url = 'https://api.cloudinary.com/v1_1/dpee5cimt/upload'

  cld = new Cloudinary({
    cloud: {
      cloudName: 'dpee5cimt'
    }
  })

  constructor(private http: HttpClient) {}

  getSample(){
    return this.cld.image('cld-sample')
  }

  uploadImg(imageFile: File): Observable<any>{
    const formData = new FormData()
    formData.append('file', imageFile)

    return this.http.post(this.url, formData)
  }

}
