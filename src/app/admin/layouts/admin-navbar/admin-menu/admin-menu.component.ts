import { Component, OnInit } from '@angular/core';
import {ROLES} from '../../../admin.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  public ROLES;
  constructor() {
    this.ROLES = ROLES;
  }

  ngOnInit() {
  }

}
