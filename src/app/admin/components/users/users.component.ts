import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ROLES} from '../../admin.component';
import {NOTIFICATION_TYPE} from '../../helpers/admin-notification/admin-notification.component';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public modalForm;
  public roles: object[];
  public users;

  private modalRef: NgbModalRef;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private user: UserService, private notification: NotificationService) {
    this.roles = [
      {id: ROLES.COLLABORATOR, value: 'Colaborador'},
      {id: ROLES.OWNER, value: 'Administrador'},
      {id: ROLES.DEVELOPER, value: 'Desarrollador'},
    ]
  }

  ngOnInit() {
    this.user.all.subscribe(
      response =>{
        this.users = response;
      }
    )
  }

  openModalForm(content){
    this.modalForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      role: new FormControl(0, [Validators.required])
    });
    this.modalRef = this.modalService.open(content);
  }

  addUser(){
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

    const payload = {
      user:{
        email: values.email,
        name: values.name,
        rol: values.role,
        password:'123456789'
      }
    }
    this.user.add(payload).subscribe(
      response => {
        this.users = [response, ...this.users];
        this.notification.show('El usuario se ha creado satisfactoriamente',{type: NOTIFICATION_TYPE.SUCCESS});
        this.modalRef.close();
      },
      error => {
        console.log(error);
        this.notification.show('No se pudo crear el usuario',{type: NOTIFICATION_TYPE.FAILED});
      })
  }


}
