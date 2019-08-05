import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public show: boolean;

  constructor() {
    this.show = false;
  }

  ngOnInit() {
  }

  toggle(){
    this.show = !this.show;
  }

}
