import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-text-editor',
  templateUrl: './admin-text-editor.component.html',
  styleUrls: ['./admin-text-editor.component.scss']
})
export class AdminTextEditorComponent implements OnInit {

  @Input() tempFormGroup: FormGroup;
  @Input() field: FormControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  options: Object;

  constructor() {}

  ngOnInit() {
    this.options = {
      htmlAllowedAttrs: [],
      heightMin: 300,
      placeholderText: this.placeholder
    }
  }
}
