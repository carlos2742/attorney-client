import {Component, OnInit} from '@angular/core';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {Observable} from 'rxjs';
import {ENTITIES} from '../../helpers/pagination/pagination.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public currentLang;
  public articleGroup$: Observable<any>;
  public articlesLoading$: Observable<boolean>;

  public paginationEntity: ENTITIES;


  constructor(private commonStore: Store<CommonState>, private portalStore: Store<PortalState>) {

    this.paginationEntity = ENTITIES.ARTICLE;

    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
      this.portalStore.dispatch(new PortalActions.LoadArticles({lang: this.currentLang, filter: {}, page: 1}));
    });
    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'blog'}));

    this.articlesLoading$ = this.portalStore.select(PortalSelectors.areArticlesLoading);
    this.articleGroup$ = this.portalStore.select(PortalSelectors.selectArticles);
  }

  ngOnInit() {}

  public dateFilter(date) {
    return date.split(' ')[0];
  }
}
