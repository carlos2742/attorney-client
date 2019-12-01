import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ViewChild('uploadElem', {static: false}) uploadElem: ElementRef;
  //
  // public accepted: string;
  // public maxSize: number;
  // public files: File[];
  // public invalidFiles: File[];
  // public base64File: any;
  // public driveUrl: string;

  constructor() { }

  ngOnInit() {
  }

  // invalidFileChange() {
  // }
  //
  // fileChange() {
  //   console.log(this.files[0]);
  // }
  //
  // selectFile() {
  //   this.uploadElem.nativeElement.click();
  // }
  //
  // sendFile() {
  //   const file = this.files[0];
  //   const metadata = {
  //     name: file.name,
  //     type: file.type,
  //     content: this.base64File,
  //   };
  //   this.uploadService.sendFile(metadata).subscribe(
  //     response => {
  //       this.driveUrl = `https://drive.google.com/uc?export=view&id=${response['drive_file_id']}`;
  //       this.files.splice(0);
  //     },
  //     error => console.log(error)
  //   );
  // }

}
