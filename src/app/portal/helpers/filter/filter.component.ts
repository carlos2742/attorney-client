import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  show: boolean;
  practiceArea: Array<any>;
  currentLang: string;

  constructor(private commonStore: Store<CommonState>) {
    this.show = false;
    this.practiceArea = [
      {id: 1, name: 'immigration', selected: true, title: 'PORTAL.VIEW.APRACTICES.IMMIGRATION.TITLE'},
      {id: 4, name: 'bankruptcy', selected: true, title: 'PORTAL.VIEW.APRACTICES.BANKRUPTCY.TITLE'},
      {id: 2, name: 'family', selected: false, title: 'PORTAL.VIEW.APRACTICES.FAMILY.TITLE'},
      {id: 6, name: 'cdefense', selected: false, title: 'PORTAL.VIEW.APRACTICES.CDEFENSE.TITLE'},
      {id: 3, name: 'willsprobate', selected: false, title: 'PORTAL.VIEW.APRACTICES.WILLSPROBATE.TITLE'},
      {id: 5, name: 'injury', selected: false, title: 'PORTAL.VIEW.APRACTICES.INJURY.TITLE'}
    ];

    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
    });
  }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

  toggleItem(index){
    this.practiceArea[index].selected = !this.practiceArea[index].selected;
  }

}
