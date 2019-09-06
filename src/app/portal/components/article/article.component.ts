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
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article;
  public comments;
  public currentLang;

  private modalRef: NgbModalRef;
  public commentForm;

  public sending: boolean;
  public commentSent: boolean;

  constructor(private active: ActivatedRoute, private router: Router, private blog: BlogService,
              private commonStore: Store<CommonState>, private portalStore: Store<PortalState>,
              private localize: LocalizeRouterService,  private meta: Meta, private titleService: Title,
              private modalService: NgbModal, private fb: FormBuilder) {

    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'article'}));
    this.sending = false;
    this.commentSent = false;
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

    this.commentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
    });
  }

  private decodeTitle() {
    const title = unescape(this.active.snapshot.params.title);
    return title.split('-').join(' ');
  }

  private createSlug(title) {
    return escape(title.split(' ').join('-'));
  }

  private getArticle(title) {
    this.blog.article(title).subscribe(
      response => {
        this.article = response;
        const keywords = this.article.tags.map(item => item.name).join(', ');
        this.titleService.setTitle(this.article.title[this.currentLang]);
        this.meta.updateTag({name: 'keywords', content: keywords});

        this.blog.commentsList(this.article.id).subscribe(
          commentResponse => {
            this.comments = commentResponse;
          });
      });
  }

  public dateFilter(date) {
    return date.split('.')[0];
  }

  public openModal(content) {
    const options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'} as NgbModalOptions;
    this.modalRef = this.modalService.open(content, options);
    this.modalRef.result.then(
      (result) => {},
      (reason) => {});
  }

  public hideModal() {
    this.modalRef.close();
  }

  public sendComment() {
    if (this.commentForm.invalid) {
      Object.keys(this.commentForm.controls).forEach(
        field => {
          const control = this.commentForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      return;
    }

    this.sending = true;
    this.blog.createComment(this.article.id, this.commentForm.value).subscribe(
      response => {
        this.sending = false;
        this.commentSent = true;
        this.hideModal();
        this.commentForm.reset();
      },
      error => {
        console.log(error);
      });
  }

}
