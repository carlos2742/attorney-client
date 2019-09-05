import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../../shared/services/blog/blog.service';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {isNullOrUndefined} from 'util';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import * as PortalActions from '../../store/actions/portal.actions';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article;
  public currentLang;

  constructor(private active: ActivatedRoute, private blog: BlogService, private commonStore: Store<CommonState>, private portalStore: Store<PortalState> ) {
    commonStore.select(CommonSelector.selectCurrentLanguage).subscribe((lang) => {
      this.currentLang = lang;
      const title = isNullOrUndefined(this.article) ? this.decodeTitle() : this.article.title[lang];
      this.getArticle(title);
    });
    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'article'}));
  }

  ngOnInit() {}

  private decodeTitle() {
    const title = decodeURIComponent(this.active.snapshot.params.title);
    return title.split('+').join(' ');
  }

  private getArticle(title) {
    this.blog.article(title).subscribe(
      response => {
        this.article = response;
      });
  }

  public dateFilter(date) {
    return date.split('.')[0];
  }

}
