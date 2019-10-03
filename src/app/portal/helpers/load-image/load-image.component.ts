import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit {

  @Input() imageSrc: string;

  public loaded: boolean;

  constructor() {
    this.loaded = false;
  }

  ngOnInit() {
  }

}
