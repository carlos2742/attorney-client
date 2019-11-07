import { Component, OnInit } from '@angular/core';
import {AngularTokenService} from 'angular-token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private tokenService: AngularTokenService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.tokenService.signOut().subscribe(
      response => {
        console.log('success');
        console.log(response);
        this.router.navigateByUrl('/admin/login');
      },
      error => {
        console.log(error);
      }
    )
  }

}
