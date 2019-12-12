import {Component, Input, OnInit} from '@angular/core';
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

  constructor() {
    this.options = {
      htmlAllowedAttrs: [],
      attribution: true,
      heightMin: 300,
      placeholderText: this.placeholder,
      events: {
        'contentChanged': function(){
          // console.log(this.html.get());
        }
      }
    }
  }

  ngOnInit() {
  }
}
