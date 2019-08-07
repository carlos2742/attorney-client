import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {State} from '../../store/reducers/portal.reducers';
import {Store} from '@ngrx/store';
import * as PortalActions from '../../store/actions/portal.actions';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {CommonService} from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() subheaderLayout: boolean;
  public requestForm;
  public formSent: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private common: CommonService) {
    this.requestForm = formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(7)]),
      message: new FormControl('', [Validators.required]),
    });
    this.store.select(PortalSelectors.isFormSent).subscribe(data => this.formSent = data);
  }

  ngOnInit() {
  }

  sendForm() {
    if (this.requestForm.invalid) {
      Object.keys(this.requestForm.controls).forEach(
        field => {
          const control = this.requestForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      return;
    }

    if (this.requestForm.valid) {
      this.store.dispatch(new PortalActions.SendEmail(this.requestForm.value));
    }
  }

}
