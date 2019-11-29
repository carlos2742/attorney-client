import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TagService} from '../../services/tag/tag.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ROLES} from '../../admin.component';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public modalForm;
  public roles: object[];
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private user: UserService, private auth:AuthenticationService) {
    this.roles = [
      {id: ROLES.COLLABORATOR, value: 'Colaborador'},
      {id: ROLES.OWNER, value: 'Administrador'},
      {id: ROLES.DEVELOPER, value: 'Desarrollador'},
    ]
  }

  ngOnInit() {
    this.user.all.subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  openModalForm(content){
    this.modalForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('123456789', [Validators.required]),
      passwordConfirmation: new FormControl('123456789', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      role: new FormControl(0, [Validators.required])
    });
    this.modalService.open(content);
  }

  register(){
    if (this.modalForm.invalid) {
      Object.keys(this.modalForm.controls).every(
        field => {
          const control = this.modalForm.get(field);
          if(control.status === 'INVALID'){
            control.markAsDirty({ onlySelf: true });
            return false;
          }
          return true;
        });
      return;
    }

    const values = this.modalForm.value;
    const registerParams = {
      login: values.login,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation
    };
    const updateParams = {
      user:{
        email: values.login,
        name: values.name,
        role: values.role
      }
    }
    this.auth.register(registerParams).pipe(
      map(response => response.data.id),
      switchMap(id => { return this.user.update(id,updateParams)})
    ).subscribe(response => {console.log(response)})
  }


}
