import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../shared/services/common/common.service';
import {CommonState} from '../shared/store/reducers/common.reducers';
import {Store} from '@ngrx/store';
import * as CommonActions from '../shared/store/actions/common.actions';
import * as CommonSelector from '../shared/store/selectors/common.selectors';
declare var Tawk_API

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private common: CommonService, private store: Store<CommonState>) {
    this.store.dispatch(new CommonActions.InitializeLanguage());
  }

  ngOnInit() {
    this.createTawkLiveChat();
  }

  createTawkLiveChat(){
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://embed.tawk.to/${this.common.tawkId}/default`;
    script.onload = ()=>{
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    };
    document.body.appendChild(script);
  }
}
