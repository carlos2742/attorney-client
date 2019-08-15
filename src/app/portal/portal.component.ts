import { Component, OnInit } from '@angular/core';
import {CommonState} from '../shared/store/reducers/common.reducers';
import {Store} from '@ngrx/store';
import * as CommonActions from '../shared/store/actions/common.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private store: Store<CommonState>) {
    // this.store.dispatch(new CommonActions.InitializeLanguage());
  }

  ngOnInit() {
  }

}
