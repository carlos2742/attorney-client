import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.scss']
})
export class AdminButtonComponent implements OnInit {

  @Input() executed: boolean;
  @Input() name: string;
  @Input() classes: string;
  @Output() action: EventEmitter<any>;

  constructor() {
    this.action = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  execAction(){
    this.action.emit(null);
  }

}
