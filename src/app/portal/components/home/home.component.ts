import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PortalService} from '../../services/portal/portal.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public practices: Array<any>;

  constructor(private portalService: PortalService) {
    this.practices = ['IMMIGRATION', 'FAMILY', 'WILLSPROBATE', 'BANKRUPTCY', 'INJURY'];
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.portalService.goToSection(['about', 'practices']);
  }

}
