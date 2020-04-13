import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

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
  @Input() separator: boolean;
  @Input() page: number;

  boundaryLinks: boolean;
  maxSize: number;

  constructor(private portalStore: Store<PortalState>, private router: Router, private localize: LocalizeRouterService) {
    this.maxSize = 5;
    this.boundaryLinks = false;
  }

  ngOnInit() {
  }

  public pageChange(page) {
    if (this.entity === ENTITIES.COMMENT) {
      const articleId = this.params.id;
      this.portalStore.dispatch(new PortalActions.LoadComments({articleId, page}));
    } else {
      const route = this.localize.translateRoute('/portal/blog');
      this.router.navigate([route,page]);
    }
  }

}
