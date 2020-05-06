import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[timeAgo]'
})
export class TimeAgoDirective implements OnInit{
  @Input('timeAgo') time: number;
  constructor(private element: ElementRef, private translate: TranslateService) { }

  ngOnInit(): void {
    this.renderTime();
    this.translate.onLangChange.subscribe((event:LangChangeEvent) => this.renderTime());
  }

  private renderTime(){
    let key = 'NOW';
    let param = {};

    if(this.time >= 1){
      if (this.time < 24){
        key = 'HOURS';
        param = {time: this.time};
      } else if(this.time/24 < 7){
        key = 'DAYS';
        param = {time: Math.floor(this.time/24)}
      } else if(this.time/168 < 4){
        key = 'WEEKS';
        param = {time: Math.floor(this.time/168)}
      } else if(this.time/672 < 12){
        key = 'MONTHS';
        param = {time: Math.floor(this.time/672)}
      } else{
        key = 'YEARS';
        param = {time: Math.floor(this.time/8064)}
      }
      key = param['time'] === 1 ? `SINGULAR.${key}` : `PLURAL.${key}`;
    }

    this.translate.get(`PORTAL.TIME_AGO.${key}`,param).subscribe(value => {
      this.element.nativeElement.innerHTML = value;
    });
  }


}
