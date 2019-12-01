import { Injectable } from '@angular/core';
import {AngularTokenService} from 'angular-token';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: any;

  constructor(private tokenService: AngularTokenService, public router: Router, private user: UserService) {
    this.currentUser = null;
  }

  get isLogged(){
    return this.tokenService.userSignedIn();
  }

  get options(){
    return this.tokenService.tokenOptions;
  }

  public goToLogin(){
    const url = this.tokenService.tokenOptions.signInRedirect;
    this.router.navigateByUrl(url);
  }

  public permissionDenied() {
    this.router.navigate(['admin/401']);
  }

  public loggedUser(){
    if(!this.currentUser){
      return this.user.profile().pipe(map(response => {
        this.currentUser = response;
        return response;
      }));
    } else {
      return new Observable( observe => {
        isNullOrUndefined(this.currentUser) ? observe.error({error: 'currentUser not found'}) : observe.next(this.currentUser);
        observe.complete();
      });
    }
  }

  public cleanLoggedUser(){
    this.currentUser = null;
  }

  register(payload){
    return this.tokenService.registerAccount(payload);
  }

  login(payload){
    return this.tokenService.signIn(payload).pipe(map(response => {
      const userId = response.body.data.id;
      localStorage.setItem('userId',userId);
    }));
  }

  updatePassword(payload){
    return this.tokenService.updatePassword(payload);
  }

  logout(){
    this.cleanLoggedUser();
    return this.tokenService.signOut();
  }
}
