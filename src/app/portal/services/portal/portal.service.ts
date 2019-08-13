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
        this.goTop();
      } else if (allowed.includes(select)) {
        this.goToElement(select);
      }
    });
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
  goToElement(id) {
    const element = document.getElementById(id);
    if (!isNullOrUndefined(element)) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}
