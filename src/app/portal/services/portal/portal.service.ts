import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelector from '../../store/selectors/portal.selectors';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private store: Store<PortalState>) { }

  goToSection(allowed: Array<string>) {
    this.store.select(PortalSelector.selectedItem).subscribe(select => {
      if (select === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth'});
      } else if (allowed.includes(select)) {
        const element = document.getElementById(select);
        if (!isNullOrUndefined(element)) {
          element.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  }
}
