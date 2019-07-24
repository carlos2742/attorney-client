import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/services/common/common.service';
import {State} from './store/reducers/portal.reducers';
import {Store} from '@ngrx/store';
import * as PortalActions from './store/actions/portal.actions';
import * as PortalSelector from './store/selectors/portal.selectors';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private common: CommonService, private store: Store<State>) {
    this.store.dispatch(new PortalActions.InitializeLanguage());
    this.store.dispatch(new PortalActions.ChangeLanguage('es'));

    this.store.select(PortalSelector.selectLanguage).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
