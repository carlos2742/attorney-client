import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NotificationService} from '../../services/notification/notification.service';
import {NOTIFICATION_TYPE} from '../../helpers/admin-notification/admin-notification.component';
import {UserService} from '../../services/user/user.service';
import {match} from '../../validators/form/customs-validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser;
  public profileForm;
  public passwordForm;
  public editing: boolean;

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, private notification: NotificationService, private user: UserService) {
    this.editing = false;
    this.initPasswordForm()
  }

  ngOnInit() {
    this.auth.loggedUser().subscribe( response => {
      this.currentUser = response;
      this.initProfileForm();
    });
  }

  showForm(){
    this.editing = true;
  }

  hideForm(){
    this.editing = false;
    this.initProfileForm();
  }

  saveProfile(){
    if(!this.isFormValidated(this.profileForm)){
      return;
    }
    this.user.update(this.currentUser.id,{user:{...this.profileForm.value}}).subscribe(
      response => {
        this.currentUser = response;
        this.notification.show('Su usuario ha sido actualizado', {type:NOTIFICATION_TYPE.SUCCESS});
        this.hideForm();
      },
      error =>{
        console.log(error);
        this.notification.show('No se pudo actualizar el usuario', {type:NOTIFICATION_TYPE.FAILED});
      }
    )
  }

  updatePass(){
    if(!this.isFormValidated(this.passwordForm)){
      return;
    }

    this.auth.updatePassword(this.passwordForm.value).subscribe(
      response => {
        console.log(response);
        this.notification.show('Su contraseña ha sido actualizada', {type:NOTIFICATION_TYPE.SUCCESS});
        this.passwordForm.reset();
      },
      error =>{
        console.log(error);
        this.notification.show('Su contraseña no se ha podido actualizar', {type:NOTIFICATION_TYPE.FAILED});
        this.passwordForm.reset();
      }
    );
  }

  private isFormValidated(form){
    if (form.invalid) {
      Object.keys(form.controls).every(
        field => {
          const control = form.get(field);
          if(control.status === 'INVALID'){
            control.markAsDirty({ onlySelf: true });
            return false;
          }
          return true;
        });
      return false;
    }
    return true;
  }

  private initProfileForm(){
    this.profileForm = this.formBuilder.group({
      name: new FormControl(this.currentUser.name),
      email: new FormControl(this.currentUser.email, [Validators.required])
    });
  }

  private initPasswordForm(){
    this.passwordForm = this.formBuilder.group({
      passwordCurrent: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required])
    });

    const passwordConfirmation =  this.passwordForm.controls.passwordConfirmation;
    passwordConfirmation.setValidators([Validators.required, match(this.passwordForm.controls.password)]);
    passwordConfirmation.updateValueAndValidity();
  }

}
