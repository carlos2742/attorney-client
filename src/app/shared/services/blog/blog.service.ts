import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private articlesResources: string;
  private commentsResources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.articlesResources = `${this.common.apiUrl}articles/`;
    this.commentsResources = `${this.common.apiUrl}comments/`;
  }

  public articleList(lang, filters = {}, page = 1) {
    const url = `${this.articlesResources + lang}/search/${page}`;
    return this.http.post(url, {filters:filters});
  }

  public article(permalink, lang) {
    const url = `${this.articlesResources + lang}/${permalink}/view`;
    return this.http.get(url);
  }

  public commentsList(articleId, page = 1) {
    const url = `${this.articlesResources}${articleId}/comments/${page}`;
    return this.http.get(url);
  }

  public createComment(articleId, payload) {
    const url = `${this.articlesResources}${articleId}/comments`;
    return this.http.post(url, {comment: payload});
  }
}
