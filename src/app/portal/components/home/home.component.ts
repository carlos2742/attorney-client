import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public practices: Array<any>;

  constructor() {
    this.practices = ['IMMIGRATION', 'FAMILY', 'WILLSPROBATE', 'BANKRUPTCY', 'INJURY', 'CDEFENSE'];
  }

  ngOnInit() {
  }

}
