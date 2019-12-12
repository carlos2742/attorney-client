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

  constructor() {
    this.options = {
      htmlAllowedAttrs: [],
      heightMin: 300,
      placeholderText: this.placeholder,
      events: {
        'contentChanged': () => {
          const parsedValue = this.parseValue(this.field.value);
          this.field.setValue(parsedValue);
        }
      }
    }
  }

  ngOnInit() { }

  private parseValue(value){
    const element = document.createElement('div');
    element.innerHTML = value;
    const list = element.getElementsByTagName('p');
    const lastElement = list[list.length-1];
    if(lastElement.innerText === 'Powered by Froala Editor'){
      lastElement.remove()
    }
    return element.innerHTML;
  }
}
