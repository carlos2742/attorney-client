import { Injectable } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesResources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.articlesResources = `${this.common.apiUrl}articles/`;
  }

  get articles(){
    const path = this.articlesResources;
    return this.http.get(path)
  }
}
