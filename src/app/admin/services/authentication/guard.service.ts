import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observe => {
      if(!this.auth.isLogged){
        this.auth.goToLogin();
        observe.next(false);
      } else {
        this.auth.loggedUser().subscribe(
          response => {
            const userRole = response['rol'];
            const requiredRoles = route.data.roles;

            if (userRole === '') {
              this.auth.permissionDenied();
              observe.next(false);
            } else if (!requiredRoles || requiredRoles.length === 0 || requiredRoles.indexOf(userRole) > -1) {
              observe.next(true);
            } else {
              this.auth.permissionDenied();
              observe.next(false);
            }
          },
          error => {
            console.log(error);
            this.auth.permissionDenied();
            observe.next(false);
          }
        );
      }
    });
  }
}
