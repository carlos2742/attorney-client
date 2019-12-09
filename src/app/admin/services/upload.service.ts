import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public sendFile(metadata) {
    const url = 'http://localhost:3000/articles/upload_image';
    return this.http.post(url, {image: metadata});
  }
}
