import {Component, OnDestroy, OnInit} from '@angular/core';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {Observable} from 'rxjs';
import {ENTITIES} from '../../helpers/pagination/pagination.component';
import {ActivatedRoute} from '@angular/router';
import {Filter} from '../../../models/portal.model';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public currentLang;
  public currentPage;
  public articles$: Observable<any>;
  public articlesLoading$: Observable<boolean>;

  public paginationEntity: ENTITIES;

  public cardTemplates = new Array(4);

  private currentFilter: Filter;

  constructor(private commonStore: Store<CommonState>, private portalStore: Store<PortalState>, private route: ActivatedRoute) {

    this.paginationEntity = ENTITIES.ARTICLE;
    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
      this._loadArticles();
    });
    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'blog'}));

    this.articlesLoading$ = this.portalStore.select(PortalSelectors.areArticlesLoading);
    this.articles$ = this.portalStore.select(PortalSelectors.selectArticles);

    this.currentFilter = {
      keyword: '',
      practice_areas: []
    }
  }

  ngOnInit() {
    this.portalStore.select(PortalSelectors.selectArticlesFilter).pipe(debounceTime(300), distinctUntilChanged()).subscribe((filter: Filter) =>{
      this.currentFilter = filter;
      this._loadArticles();
    });

    this.route.params.subscribe(params =>{
      this.currentPage = params['page'] ? params['page'] : 1;
      this._loadArticles();
    });
  }

  public dateFilter(date) {
    return date.split(' ')[0];
  }

  private _loadArticles(){
    this.portalStore.dispatch(new PortalActions.LoadArticles({lang: this.currentLang, filter: this.currentFilter, page: this.currentPage}));
  }
}
