import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-admin-error',
  templateUrl: './admin-error.component.html',
  styleUrls: ['./admin-error.component.scss']
})
export class AdminErrorComponent implements OnInit {

  @Input() field: FormControl;

  constructor() { }

  ngOnInit() {}

}
