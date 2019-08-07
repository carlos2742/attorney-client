import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../store/reducers/portal.reducers';
import * as PortalSelectors from '../../../store/selectors/portal.selectors';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public show: boolean;
  public formSent: boolean;

  constructor(private store: Store<State>) {
    this.show = false;
    this.store.select(PortalSelectors.isFormSent).subscribe(data => {
      this.formSent = data;
    });
  }

  ngOnInit() {
  }

  toggleForm() {
    this.show = !this.show;
  }

}
