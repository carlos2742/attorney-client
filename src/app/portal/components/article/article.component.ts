import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../../../shared/services/blog/blog.service';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../shared/store/selectors/common.selectors';
import {PortalState} from '../../store/reducers/portal.reducers';
import * as PortalActions from '../../store/actions/portal.actions';
import * as PortalSelectors from '../../store/selectors/portal.selectors';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {PortalService} from '../../services/portal/portal.service';
import {ENTITIES} from '../../helpers/pagination/pagination.component';
import {Observable} from 'rxjs';
import {Article} from '../../../models/portal.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article$: Observable<any>;
  public comments$: Observable<any>;
  public currentLang;

  public paginationEntity: ENTITIES;
  public commentForm;

  public sending: boolean;
  public commentSent: boolean;
  public articleLoading$: Observable<boolean>;
  public commentsLoading$: Observable<boolean>;

  private articleId: number;
  private modalRef: NgbModalRef;

  private subscriptions;

  constructor(private active: ActivatedRoute, private router: Router, private blog: BlogService,
              private commonStore: Store<CommonState>, private portalStore: Store<PortalState>,
              private localize: LocalizeRouterService, private modalService: NgbModal,
              private portal: PortalService, private fb: FormBuilder, private location: Location) {

    this.portalStore.dispatch(new PortalActions.SelectMenu({menuItem: 'article'}));

    this.subscriptions = [];

    this.articleLoading$ = this.portalStore.select(PortalSelectors.isArticleLoading);
    this.article$ = this.portalStore.select(PortalSelectors.selectArticle);
    this.commentsLoading$ = this.portalStore.select(PortalSelectors.areCommentsLoading);
    this.comments$ = this.portalStore.select(PortalSelectors.selectComments);

    const subscription = this.article$.subscribe((article: Article) => {
      if (!article) {return;}

      this.articleId = article.id;
      const keywords = article.tags.map(item => item.name).join(', ');

      this.portal.addSocialNetworksMetaTags(article.title, article.image_id, keywords);

      const route = this.localize.translateRoute('article');
      this.location.replaceState(`${this.currentLang}/portal/${route}/${article.permalinks[this.currentLang]}`);
    });

    this.subscriptions.push(subscription);

    this.sending = false;
    this.commentSent = false;
    this.paginationEntity = ENTITIES.COMMENT;
  }

  ngOnInit() {
    const subscription = this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe((lang) => {
      this.currentLang = lang;
      const permalink = this.active.snapshot.params.permalink;
      this.portalStore.dispatch(new PortalActions.LoadArticle({permalink, lang: this.currentLang}));
    });

    this.subscriptions.push(subscription);

    this.commentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
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
    this.blog.createComment(this.articleId, this.commentForm.value).subscribe(
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
