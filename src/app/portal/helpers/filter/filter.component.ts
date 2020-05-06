import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {Subject} from 'rxjs';
import {Filter} from '../../../models/portal.model';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public show: boolean;
  public practiceArea: Array<any>;
  public currentLang: string;
  public keyword: string;

  private event$: Subject<any>;

  constructor(private commonStore: Store<CommonState>, private portalStore: Store<PortalState>) {
    this.show = false;

    this._initFilter();

    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
    });

    this.event$ = new Subject<any>();
  }

  ngOnInit() {
    this.event$.subscribe(value => this._updateFilter());
  }

  toggleFilter() {
    this.show = !this.show;
  }

  markItem(index){
    const item = this.practiceArea[index];
    item.selected = !item.selected;
    this.event$.next();
  }

  onChange(value){
    if(value.length === 0 || value.length > 2){
      this.event$.next();
    }
  }

  private _updateFilter(){
    const payload: Filter = {
      keyword: this.keyword,
      practice_areas: this.practiceArea.filter(item => item.selected).map(item => item.id)
    }
    this.portalStore.dispatch(new PortalActions.SetArticlesFilters(payload));
  }

  private _initFilter(){
    this.practiceArea = [
      {id: 1, name: 'immigration', selected: false, title: 'PORTAL.VIEW.APRACTICES.IMMIGRATION.TITLE'},
      {id: 2, name: 'family', selected: false, title: 'PORTAL.VIEW.APRACTICES.FAMILY.TITLE'},
      {id: 3, name: 'willsprobate', selected: false, title: 'PORTAL.VIEW.APRACTICES.WILLSPROBATE.TITLE'},
      {id: 4, name: 'bankruptcy', selected: false, title: 'PORTAL.VIEW.APRACTICES.BANKRUPTCY.TITLE'},
      {id: 5, name: 'injury', selected: false, title: 'PORTAL.VIEW.APRACTICES.INJURY.TITLE'}
    ];

    this.portalStore.select(PortalSelectors.selectArticlesFilter).subscribe((filter: Filter) =>{
      this.keyword = filter.keyword;
      this.practiceArea.forEach(item => item['selected'] = filter.practice_areas.indexOf(item['id']) > -1 ? true : false);
    });
  }
}
