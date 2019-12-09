import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from '../../shared/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private resources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.resources = `${this.common.apiUrl}articles`;
  }

  public sendFile(metadata) {
    const path = `${this.resources}/upload_image`;
    return this.http.post(path, {image: metadata});
  }
}
