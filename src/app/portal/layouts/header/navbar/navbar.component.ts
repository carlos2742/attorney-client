import { Component, OnInit } from '@angular/core';
import {State} from '../../../store/reducers/portal.reducers';
import * as PortalActions from '../../../store/actions/portal.actions';
import * as PortalSelectors from '../../../store/selectors/portal.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public show: boolean;
  public selectedMenu: string;

  constructor(private store: Store<State>) {
    this.show = false;
    this.store.select(PortalSelectors.selectedMenu).subscribe(item => this.selectedMenu = item);
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
