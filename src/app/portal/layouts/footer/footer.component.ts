import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PortalService} from '../../services/portal/portal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  constructor(private portalService: PortalService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.portalService.goToSection(['contacts']);
  }

}
