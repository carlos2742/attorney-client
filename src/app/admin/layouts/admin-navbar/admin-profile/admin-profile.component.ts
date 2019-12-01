import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducers';
import * as AdminSelector from '../../../store/selectors/admin.selectors'
import {Observable} from 'rxjs';
import {User} from '../../../../models/admin.model';
import * as AdminActions from '../../../store/actions/admin.actions';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  public loggedUser$: Observable<User>;

  constructor(private adminStore: Store<AdminState>, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.adminStore.select(AdminSelector.isLoggedUserLoaded).subscribe(loaded => {
      if(!loaded){
        this.adminStore.dispatch(new AdminActions.LoadLoggedUser());
      }
    });
    this.loggedUser$ = this.adminStore.select(AdminSelector.selectLoggedUser);
  }

  logout(){
    this.auth.logout().subscribe(
      response => {
        this.router.navigateByUrl('/admin/login');
      },
      error => {
        console.log(error);
      }
    )
  }

}
