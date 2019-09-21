import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../store/reducers/portal.reducers';

export enum ENTITIES {
  ARTICLE = 'article',
  COMMENT = 'comment',
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Input() entity: ENTITIES;
  @Input() params: any;

  boundaryLinks: boolean;
  maxSize: number;

  constructor(private portalStore: Store<PortalState>) {
    this.maxSize = 5;
    this.boundaryLinks = false;
  }

  ngOnInit() {
  }

  public pageChange(payload) {
    console.log(payload);
  }

}
