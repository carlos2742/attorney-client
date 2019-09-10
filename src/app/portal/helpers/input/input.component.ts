import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() tempFormGroup: FormGroup;
  @Input() field: FormControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() fieldName: string;
  @Input() type: string;
  public params: object;
  public showError: boolean;
  public requiredSymbol: string;

  constructor(private translate: TranslateService) {
    this.showError = false;
  }

  ngOnInit() {
    this.loadFieldTranslate();
    const validator = this.tempFormGroup.controls[this.controlName].validator(this.field);
    this.requiredSymbol = validator && validator.required ? '*' : '';

  }

  loadFieldTranslate() {
    this.translate.get(this.fieldName).subscribe(response => {
      this.params = {
        field: response
      };
    });
  }

  toggleError() {
    this.showError = !this.showError;
  }

  hideError() {
    this.showError = false;
  }

}
