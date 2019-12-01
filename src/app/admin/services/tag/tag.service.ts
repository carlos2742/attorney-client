import { Injectable } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private resources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.resources = `${this.common.apiUrl}tags`;
  }

  get all(){
    const path = this.resources;
    return this.http.get(path)
  }

  public create(payload){
    const path = this.resources;
    return this.http.post(path,payload);
  }

  public update(id, payload){
    const path = `${this.resources}/${id}`;
    return this.http.put(path,payload);
  }

  public delete(id){
    const path = `${this.resources}/${id}`;
    return this.http.delete(path);
  }
}
