import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers/portal.reducers';
import * as PortalSelector from '../../store/selectors/portal.selectors';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private store: Store<State>) { }

  goToSection(allowed: Array<string>) {
    this.store.select(PortalSelector.selectedMenu).subscribe(select => {
      if (allowed.includes(select)) {
        const element = document.getElementById(select);
        if (!isNullOrUndefined(element)) {
          element.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  }
}
