import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Directive({
  selector: '[showForRole]'
})
export class ShowForRoleDirective implements OnInit{
  @Input('showForRole') role: number[];
  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.loggedUser().subscribe(
      response => {
        if (this.role.indexOf(response['role']) > -1) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

}
