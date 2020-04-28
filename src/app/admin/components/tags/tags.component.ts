import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TagService} from '../../services/tag/tag.service';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification/notification.service';
import {NOTIFICATION_TYPE} from '../../helpers/admin-notification/admin-notification.component';
import {timer} from 'rxjs';

enum MODAL_TYPE{
  CREATE,
  EDIT,
  DELETE
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  public form;
  public tags;

  public modalForm;
  public modalType: MODAL_TYPE;
  public modalRef: NgbModalRef;

  public loading: boolean;
  public sending: boolean;

  constructor(private formBuilder: FormBuilder, private tagService: TagService, private modalService: NgbModal,
              private notification: NotificationService) {
    this.form = this.formBuilder.group({
      title: new FormControl(''),
    });
    this.modalForm = null;
    this.sending = false;
    this.loading = false;
  }

  ngOnInit() {
    this.loadTags();
  }

  loadTags(page = 1){
    this.loading = true;
    this.tagService.all.subscribe(response => {
      timer(500).subscribe(() => {
        this.loading = false;
        this.tags = response;
      })
    });
  }

  openAddForm(content){
    this.modalType = MODAL_TYPE.CREATE;
    this.modalForm = this.formBuilder.group({
      esName: new FormControl('', [Validators.required]),
      enName: new FormControl('', [Validators.required]),
    });
    this.open(content);
  }

  openEditForm(content, entity){
    this.modalType = MODAL_TYPE.EDIT;
    this.modalForm = this.formBuilder.group({
      id: new FormControl(entity.id, [Validators.required]),
      esName: new FormControl(entity.languages['es'], [Validators.required]),
      enName: new FormControl(entity.languages['en'], [Validators.required]),
    });
    this.open(content);
  }

  openDeleteForm(content, id){
    this.modalType = MODAL_TYPE.DELETE;
    this.modalForm = this.formBuilder.group({
      id: new FormControl(id, [Validators.required])
    });
    this.open(content);
  }

  closeForm(){
    this.modalType = null;
    this.modalForm = null;
    this.modalRef.close();
  }

  private open(content) {
    this.modalRef = this.modalService.open(content);
  }

  private formIsValid(){
    if (this.modalForm.invalid) {
      Object.keys(this.modalForm.controls).every(
        field => {
          const control = this.form.get(field);
          if(control.status === 'INVALID'){
            control.markAsTouched({ onlySelf: true });
            return false;
          }
          return true;
        });
      return false;
    }
    return true;
  }

  private get payload(){
    const formValue = this.modalForm.value;
    return {
      translation: {
        fields: [
          {
            lang: 'es',
            name: formValue.esName,
          },
          {
            lang: 'en',
            name: formValue.enName
          }
        ]
      }
    };
  }

  private get tagId(){
    const formValue = this.modalForm.value;
    return formValue.id;
  }

  create(){
    if(this.formIsValid()){
      this.sending = true;
      this.tagService.create(this.payload).subscribe(
        response => {
          this.tags = [response, ...this.tags];
          this.closeForm();
          this.notification.show('La etiqueta se ha adicionado satisfactoriamente',{type: NOTIFICATION_TYPE.SUCCESS});
          this.sending = false;
        },
        error=>{
          this.closeForm();
          this.notification.show('La etiqueta no se pudo adicionar',{type: NOTIFICATION_TYPE.FAILED});
          this.sending = false;
        }
      );
    }
  }

  update(){
    if(this.formIsValid()){
      this.sending = true;
      this.tagService.update(this.tagId, this.payload).subscribe(
        response => {
          const editedItem:any = response;
          const index = this.tags.findIndex(item => item.id === editedItem.id);
          this.tags.splice(index,1,editedItem);
          this.closeForm();
          this.notification.show('La etiqueta se ha editado satisfactoriamente',{type: NOTIFICATION_TYPE.SUCCESS});
          this.sending = false;
        },
        error=>{
          console.log(error);
          this.closeForm();
          this.notification.show('La etiqueta no se pudo editar',{type: NOTIFICATION_TYPE.FAILED});
          this.sending = false;
        }
      );
    }
  }
  delete(){
    if(this.formIsValid()){
      this.sending = true;
      this.tagService.delete(this.tagId).subscribe(
        response => {
          const deletedItem: any = response;
          this.tags = this.tags.filter(item => item.id !== deletedItem.id);
          this.closeForm();
          this.notification.show('La etiqueta se ha eliminado satisfactoriamente',{type: NOTIFICATION_TYPE.SUCCESS});
          this.sending = false;
        },
        error=>{
          this.closeForm();
          console.log(error);
          this.notification.show('La etiqueta no se pudo eliminar',{type: NOTIFICATION_TYPE.FAILED});
          this.sending = false;
        }
      );
    }
  }
}
