import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-pagination',
  templateUrl: './admin-pagination.component.html',
  styleUrls: ['./admin-pagination.component.scss']
})
export class AdminPaginationComponent implements OnInit {

  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Input() separator: boolean;

  boundaryLinks: boolean;
  maxSize: number;

  @Output() action: EventEmitter<any>;

  constructor() {
    this.maxSize = 5;
    this.boundaryLinks = false;
    this.action = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  pageChange(page){
    this.action.emit(page);
  }

}
