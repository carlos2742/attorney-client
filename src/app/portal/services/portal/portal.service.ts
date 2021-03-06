import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Store} from '@ngrx/store';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalSelector from '../../store/selectors/portal.selectors';
import * as PortalActions from '../../store/actions/portal.actions';

import {isNullOrUndefined} from 'util';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformBrowser, Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private store: Store<PortalState>, private meta: Meta, private titleService: Title,
              private location: Location, @Inject(PLATFORM_ID) private platformId: any,) { }

  goToSection(allowed: Array<string>) {
    this.store.select(PortalSelector.selectedMenuItem).subscribe(select => {
      console.log(select);
      if (select === 'home' || select === 'article' || select === 'blog') {
        if(select !== 'article' && select !== 'blog' ){
          this.store.dispatch(new PortalActions.CleanArticlesFilters())
        }
        this.goTop();
      } else if (allowed.includes(select)) {
        this.goToElement(select);
      }
    });
  }

  goTop() {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }
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
    this.createOpenGraphMetaTags(title, imageUrl);
    this.createTwitterMetaTag(title, imageUrl);
  }

  private createTwitterMetaTag(title, image) {
    this.meta.updateTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.updateTag({name: 'twitter:site', content: '@Attorney'});
    this.meta.updateTag({name: 'twitter:title', content: title});
    this.meta.updateTag({name: 'twitter:image', content: image});
  }

  /* create meta tags for facebook and linkedin*/
  private createOpenGraphMetaTags(title, image) {
    const url = `https://www.ymorejonattorney.com${this.location.path()}`;
    this.meta.updateTag({property: 'fb:app_id', content: '558879891707307'});
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:site_name', content: 'Attorney'});
    this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({property: 'og:type', content: 'article'});
    this.meta.updateTag({property: 'og:image', content: image});
  }
}
