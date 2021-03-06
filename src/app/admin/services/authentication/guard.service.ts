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
        this.goToLogin(state,observe);
      } else {
        this.auth.loggedUser().subscribe(
          response => {
            if(!response){
              this.goToLogin(state,observe);
            }else{
              const userRole = response['role'];
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

  private goToLogin(state, observe){
    const options = this.auth.options;
    if(options.signInStoredUrlStorageKey){
      localStorage.setItem(
        options.signInStoredUrlStorageKey,
        state.url
      );
    }
    this.auth.goToLogin();
    observe.next(false);
  }
}
