import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../../services/notification/notification.service';
import {NOTIFICATION_TYPE} from '../../admin-notification/admin-notification.component';

@Component({
  selector: 'app-admin-image-upload',
  templateUrl: './admin-image-upload.component.html',
  styleUrls: ['./admin-image-upload.component.scss']
})
export class AdminImageUploadComponent implements OnInit {

  @Input() tempFormGroup: FormGroup;
  @Input() field: FormControl;
  @Input() controlName: string;
  @Input() imageId: string;

  @ViewChild('uploadElem', {static: false}) uploadElem: ElementRef;

  public accepted: string;
  public maxSize: number;
  public files: File[];
  public invalidFiles: File[];
  public base64File: any;

  constructor(private notification: NotificationService) {
    this.files = [];
    this.invalidFiles = [];
    this.accepted = '.png, .jpg';
    this.maxSize = 1048576;
  }

  ngOnInit() {
    if(this.imageId){
      this.base64File = `https://drive.google.com/uc?export=view&id=${this.imageId}`;
    }
  }

  get isImageSelected(){
    return this.base64File
  }

  invalidFileChange() {
    if (this.invalidFiles && this.invalidFiles[0]['file'].size > this.maxSize) {
      this.invalidFiles.splice(0);
      this.notification.show('La imagen no debe superar 1 mb', {type:NOTIFICATION_TYPE.FAILED});
    }
  }

  fileChange() {
    const file = this.files[0];
    setTimeout(()=>{
      this.field.setValue({
        name: file.name,
        type: file.type,
        content: this.base64File,
        id: ''
      });
    },50);
  }

  selectFile() {
    this.uploadElem.nativeElement.click();
  }

  removeFile(){
    if (this.files.length > 0){
      this.files.splice(0);
    }
    this.base64File = null;
    const val = this.imageId ? {id: this.imageId} : '';
    this.field.setValue(val);
  }
}
