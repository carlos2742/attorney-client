import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public show: boolean;

  constructor() {
    this.show = false;
  }

  ngOnInit() {
  }

  toggleForm() {
    this.show = !this.show;
  }

}
