import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../../../shared/services/blog/blog.service';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {isNullOrUndefined} from 'util';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Meta, Title} from '@angular/platform-browser';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article;
  public currentLang;

  constructor(private active: ActivatedRoute, private router: Router, private blog: BlogService,
              private commonStore: Store<CommonState>, private portalStore: Store<PortalState>,
              private localize: LocalizeRouterService,  private meta: Meta, private titleService: Title) {

    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'article'}));
  }

  ngOnInit() {
    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe((lang) => {
      this.currentLang = lang;
      if (!isNullOrUndefined(this.article)) {
        const route = this.localize.translateRoute(`article/${this.createSlug(this.article.title[lang])}`);
        this.router.navigate([`${lang}/portal/${route}`]);
      }
      const title = this.decodeTitle();
      this.getArticle(title);
    });

  }

  private decodeTitle() {
    const title = decodeURIComponent(this.active.snapshot.params.title);
    return title.split('+').join(' ');
  }

  private createSlug(title) {
    return encodeURI(title.split(' ').join('+'));
  }

  private getArticle(title) {
    this.blog.article(title).subscribe(
      response => {
        this.article = response;
        const keywords = this.article.tags.map(item => item.name).join(', ');
        this.titleService.setTitle(this.article.title[this.currentLang]);
        this.meta.updateTag({name: 'keywords', content: keywords});
      });
  }

  public dateFilter(date) {
    return date.split('.')[0];
  }

}
