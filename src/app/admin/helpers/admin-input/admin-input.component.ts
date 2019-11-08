import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-input',
  templateUrl: './admin-input.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./admin-input.component.scss']
})
export class AdminInputComponent implements OnInit {

  @Input() tempFormGroup: FormGroup;
  @Input() field: FormControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
