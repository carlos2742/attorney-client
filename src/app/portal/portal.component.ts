import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/services/common/common.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private common: CommonService) {
    this.common.initLanguage();
    this.common.setLanguage('es');
  }

  ngOnInit() {
  }

}
