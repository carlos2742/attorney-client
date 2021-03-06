import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducers';
import * as AdminActions from '../../store/actions/admin.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form;
  public showError: boolean;
  public sending: boolean;

  constructor(private adminStore: Store<AdminState>, private auth: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.showError = false;
    this.sending = false;
    this.form = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  login(){
    this.showError = false;

    if (this.form.invalid) {
      Object.keys(this.form.controls).every(
        field => {
          const control = this.form.get(field);
          if(control.status === 'INVALID'){
            control.markAsDirty({ onlySelf: true });
            return false;
          }
          return true;
        });
      return;
    }

    this.sending = true;
    this.auth.login(this.form.value).subscribe(
      response => {
        this.router.navigateByUrl(localStorage.getItem('redirectTo'));
        this.adminStore.dispatch(new AdminActions.LoadLoggedUser());
      },
      error => {
        console.log(error);
        this.showError = true;
        this.sending = false;
      });
  }

  register(){
    const data = {
      login: 'carlosm880530@gmail.com',
      password: 'gundamx880530',
      passwordConfirmation: 'gundamx880530'
    };
    this.auth.register(data).subscribe(
      response => {
        console.log('success');
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

}
