import { Component, OnInit } from '@angular/core';
export enum ROLES{
  COLLABORATOR,
  OWNER,
  DEVELOPER
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



}
