import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/services/common/common.service';
import {CommonState} from '../shared/store/reducers/common.reducers';
import {Store} from '@ngrx/store';
import * as CommonActions from '../shared/store/actions/common.actions';
import * as CommonSelector from '../shared/store/selectors/common.selectors';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private common: CommonService, private store: Store<CommonState>) {
    this.store.dispatch(new CommonActions.InitializeLanguage());
    this.store.dispatch(new CommonActions.ChangeLanguage('es'));

    this.store.select(CommonSelector.selectLanguage).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
