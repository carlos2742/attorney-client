import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelector from '../../store/selectors/portal.selectors';
import {isNullOrUndefined} from 'util';
import {Meta, Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private store: Store<PortalState>, private meta: Meta, private titleService: Title,
              private location: Location) { }

  goToSection(allowed: Array<string>) {
    this.store.select(PortalSelector.selectedMenuItem).subscribe(select => {
      if (select === 'home') {
        this.goTop();
      } else if (allowed.includes(select)) {
        this.goToElement(select);
      }
    });
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }

  goToElement(id) {
    const element = document.getElementById(id);
    if (!isNullOrUndefined(element)) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }

  addPortalMetaTags(title, keywords) {
    this.titleService.setTitle(title);
    this.meta.updateTag({name: 'keywords', content: keywords});
  }

  addSocialNetworksMetaTags(title, image, keywords) {
    const imageUrl = `https://drive.google.com/uc?export=view&id=${image}`;
    this.addPortalMetaTags(title, keywords);
    // this.createTwitterMetaTag(title, imageUrl);
    this.createOpenGraphMetaTags(title, imageUrl);
  }

  private createTwitterMetaTag(title, image) {
    this.meta.updateTag({name: 'twitter:title', content: title});
    this.meta.updateTag({name: 'twitter:image', content: image});
    // this.meta.updateTag({name: 'twitter:description', content: 'description'});
  }

  /* create meta tags for facebook and linkedin*/
  private createOpenGraphMetaTags(title, image) {
    const url = `https://www.ymorejonattorney.com${this.location.path()}`;
    this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({property: 'og:type', content: 'website'});
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:description', content: 'description'});
    this.meta.updateTag({property: 'og:image', content: 'https://www.truecodex.com/assets/images/sociallogo.jpg'});
  }
}
