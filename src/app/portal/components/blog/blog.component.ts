import {Component, OnInit} from '@angular/core';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {Observable} from 'rxjs';
import {ENTITIES} from '../../helpers/pagination/pagination.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public currentLang;
  public currentPage;
  public articleGroup$: Observable<any>;
  public articlesLoading$: Observable<boolean>;

  public paginationEntity: ENTITIES;

  public cardTemplates = new Array(4);

  constructor(private commonStore: Store<CommonState>, private portalStore: Store<PortalState>, private route: ActivatedRoute) {

    this.paginationEntity = ENTITIES.ARTICLE;
    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
    });
    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'blog'}));

    this.articlesLoading$ = this.portalStore.select(PortalSelectors.areArticlesLoading);
    this.articleGroup$ = this.portalStore.select(PortalSelectors.selectArticles);
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.currentPage = params['page'] ? params['page'] : 1;
      this.portalStore.dispatch(new PortalActions.LoadArticles({lang: this.currentLang, filter: {}, page: this.currentPage}));
    });
  }

  public dateFilter(date) {
    return date.split(' ')[0];
  }
}
