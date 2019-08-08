import { Component, OnInit } from '@angular/core';
import {PortalState} from '../../../store/reducers/portal.reducers';
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

  constructor(private portalStore: Store<PortalState>) {
    this.show = false;
    this.portalStore.select(PortalSelectors.selectedItem).subscribe(item => this.selectedMenu = item);
  }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

  selectItem(item, route = '') {
    this.portalStore.dispatch(new PortalActions.SelectMenu({item, route}));
  }
}
