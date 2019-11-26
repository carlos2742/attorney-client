import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.loggedUser().subscribe(response => console.log(response));
  }

  logout(){
    this.auth.logout().subscribe(
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
