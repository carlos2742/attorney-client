import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {PortalService} from '../../services/portal/portal.service';

@Component({
  selector: 'app-frequents-answers-questions',
  templateUrl: './frequents-answers-questions.component.html',
  styleUrls: ['./frequents-answers-questions.component.scss']
})
export class FrequentsAnswersQuestionsComponent implements OnInit, AfterViewInit {

  public selectItem: string;
  public faqs: Array<any>;

  constructor(private portalService: PortalService) {
    this.selectItem = '';
    this.faqs = [
      {
        id: 'GENERAL',
        items: this.range(4),
      },
      {
        id: 'IMMIGRATION',
        items: this.range(3),
      },
      {
        id: 'FAMILY',
        items: this.range(8),
      },
      {
        id: 'WILLSPROBATE',
        items: this.range(8),
      },
      {
        id: 'BANKRUPTCY',
        items: this.range(5),
      },
      {
        id: 'REALPROPERTY',
        items: this.range(3),
      },
      {
        id: 'INJURY',
        items: this.range(2),
      },
      {
        id: 'CDEFENSE',
        items: this.range(5),
      }
    ];
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.portalService.goToSection(['frequents-answers']);
  }

  private range(length) {
    const list = [];
    for (let i = 1; i <= length; i++) {
      list.push(i);
    }
    return list;
  }

  afterChange($event: NgbPanelChangeEvent) {
    this.selectItem = $event.nextState ? $event.panelId : '';
  }

}
