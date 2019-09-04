import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../../shared/services/blog/blog.service';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public articleGroup;
  public currentLang;

  constructor(private blog: BlogService, private commonStore: Store<CommonState> ) {

    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
      this.getArticles();
    });
  }

  ngOnInit() {}

  private getArticles(){
    this.blog.articleList().subscribe(response => {
      this.articleGroup = response;
      this.articleGroup = this.articleGroup.flatMap(item => {
        const newDate = item.date.split('.')[0];
        return {date: newDate, article_list: item.article_list };
      });
    });
  }

}
