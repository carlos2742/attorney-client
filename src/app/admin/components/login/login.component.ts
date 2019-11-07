import { Component, OnInit } from '@angular/core';
import {AngularTokenService} from 'angular-token';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form;

  constructor(private tokenService: AngularTokenService, private router: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login(){

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(
        field => {
          const control = this.form.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      return;
    }

    this.tokenService.signIn(this.form.value).subscribe(
      response => {
        this.router.navigateByUrl(localStorage.getItem('redirectTo'));
      },
      error => {
        //todo clean form, show error
        this.form.reset();
        console.log(error);
      });
  }

  register(){
    const data = {
      login: 'carlosm880530@gmail.com',
      password: 'gundamx880530',
      passwordConfirmation: 'gundamx880530'
    };
    this.tokenService.registerAccount(data).subscribe(
      response => {
        console.log('success');
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

}
