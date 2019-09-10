import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../../store/selectors/portal.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public show: boolean;
  public sent: boolean;
  public showSubheader$: Observable<boolean>;

  constructor(private store: Store<PortalState>) {
    this.show = false;
    this.store.select(PortalSelectors.selectFormState).subscribe(formState => {
      this.sent = formState.sent;
    });

    this.showSubheader$ = this.store.select(PortalSelectors.showSubHeader);
  }

  ngOnInit() {
  }

  toggleForm() {
    this.show = !this.show;
  }

}
