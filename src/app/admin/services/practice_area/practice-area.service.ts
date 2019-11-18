import { Injectable } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PracticeAreaService {

  private resources: string;

  constructor(private common: CommonService, private http: HttpClient) {
    this.resources = `${this.common.apiUrl}practice_areas`;
  }

  get all(){
    const path = this.resources;
    return this.http.get(path)
  }
}
