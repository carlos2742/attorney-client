import { Injectable } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.resources = `${this.common.apiUrl}users`;
  }

  get all(){
    const url = this.resources;
    return this.http.get(url);
  }

  public profile(){
    const url = this.resources+'/profile';
    return this.http.get(url);
  }

  public add(payload){
    const url = this.resources;
    return this.http.post(url,payload);
  }

  public update(id, payload){
    const url = this.resources+`/${id}`;
    return this.http.put(url, payload);
  }
}
