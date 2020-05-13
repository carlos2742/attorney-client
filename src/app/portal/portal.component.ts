import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../shared/services/common/common.service';
import {CommonState} from '../shared/store/reducers/common.reducers';
import {Store} from '@ngrx/store';
import * as CommonActions from '../shared/store/actions/common.actions';
import * as CommonSelector from '../shared/store/selectors/common.selectors';
import {DOCUMENT} from '@angular/common';
declare var Tawk_API

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private common: CommonService, private store: Store<CommonState>, @Inject(DOCUMENT) private document: any,) {
    this.store.dispatch(new CommonActions.InitializeLanguage());
  }

  ngOnInit() {
    this.createTawkLiveChat();
  }

  createTawkLiveChat(){
    let script = this.document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://embed.tawk.to/${this.common.tawkId}/default`;
    script.onload = ()=>{
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    };
    this.document.body.appendChild(script);
  }
}
