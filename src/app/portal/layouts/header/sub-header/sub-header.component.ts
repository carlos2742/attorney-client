import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../../store/selectors/portal.selectors';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public show: boolean;
  public sent: boolean;

  constructor(private store: Store<PortalState>) {
    this.show = false;
    this.store.select(PortalSelectors.selectFormState).subscribe(formState => {
      this.sent = formState.sent;
    });
  }

  ngOnInit() {
  }

  toggleForm() {
    this.show = !this.show;
  }

}
