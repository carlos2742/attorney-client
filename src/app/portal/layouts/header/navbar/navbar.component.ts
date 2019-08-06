import { Component, OnInit } from '@angular/core';
import {State} from '../../../store/reducers/portal.reducers';
import * as PortalActions from '../../../store/actions/portal.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public show: boolean;

  constructor(private store: Store<State>) {
    this.show = false;
  }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

  selectItem(item) {
    this.store.dispatch(new PortalActions.SelectMenu(item));
  }

}
