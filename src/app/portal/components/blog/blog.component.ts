import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../../shared/services/blog/blog.service';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../store/selectors/portal.selectors';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public articleGroup;
  public currentLang;

  constructor(private blog: BlogService, private commonStore: Store<CommonState>, private portalStore: Store<PortalState>) {

    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
      this.getArticles();
    });
    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'blog'}));
  }

  ngOnInit() {}

  private getArticles() {
    this.blog.articleList().subscribe(response => {
      this.articleGroup = response;
    });
  }

  public dateFilter(date) {
    return date.split('.')[0];
  }
  public createSlug(title) {
    return encodeURI(title.split(' ').join('+'));
  }

}
