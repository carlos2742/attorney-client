import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification/notification.service';

export enum NOTIFICATION_TYPE {
  SUCCESS = 0,
  FAILED = 1
}

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {

  public NOTFY_TYPE;
  constructor(private notification: NotificationService) {
    this.NOTFY_TYPE = NOTIFICATION_TYPE
  }

  ngOnInit() {}

  get messages(){
    return this.notification.messages;
  }

  remove(message){
    this.notification.remove(message);
  }
}
