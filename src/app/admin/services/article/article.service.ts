import { Injectable } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private resources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.resources = `${this.common.apiUrl}articles`;
  }

  public all(page){
    const path = `${this.resources}/all/${page}`;
    return this.http.get(path);
  }

  public article(id){
    const path = `${this.resources}/${id}`;
    return this.http.get(path);
  }

  public create(payload){
    const path = this.resources;
    return this.http.post(path, payload);
  }

  public update(id, payload){
    const path = `${this.resources}/${id}`;
    return this.http.put(path, payload);
  }

  public publish(id){
    const path = `${this.resources}/${id}/publish`;
    return this.http.get(path);
  }

  public unpublish(id){
    const path = `${this.resources}/${id}/unpublish`;
    return this.http.get(path);
  }
}
