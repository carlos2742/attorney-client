import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/article/article.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../services/notification/notification.service';
import {NOTIFICATION_TYPE} from '../../../helpers/admin-notification/admin-notification.component';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PracticeAreaService} from '../../../services/practice_area/practice-area.service';
import {TagService} from '../../../services/tag/tag.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public language: string;
  public article: any;
  public sending: boolean;

  public form;

  public practiceAreas;
  public tags;

  public editing:boolean;

  constructor(private formBuilder: FormBuilder, private pareas: PracticeAreaService, private tag: TagService,
              private activeRoute: ActivatedRoute, private articleService: ArticleService, private notification: NotificationService) {

    this.pareas.all.subscribe(response => {
      this.practiceAreas = (response as Array<any>).map(item =>{
        return{id:item.id, value: `${item.languages['es']} - (${item.languages['en']})`}
      });
    });
    this.tag.all.subscribe(response => {
      this.tags = (response as Array<any>).map(item =>{
        return{id:item.id, value: `${item.languages['es']} - (${item.languages['en']})`}
      });
    });

    this.language = 'es';
    this.sending = false;
    this.editing = false;
  }

  ngOnInit() {
    const articleId = this.activeRoute.snapshot.params.id;
    this.articleService.article(articleId).subscribe(
      response => {
        this.article = response;
        this.initForm();
      }
    );
  }

  initForm(){
    const selectedTags = this.article.tags.map(item =>{
      return{id:item.id, value: `${item.languages['es']} - (${item.languages['en']})`}
    });
    this.form = this.formBuilder.group({
      practice_area_id: new FormControl(this.article.practice_area.id, [Validators.required]),
      tags: new FormControl(selectedTags, [Validators.required]),
      image_id: new FormControl('' ),
      esTitle: new FormControl(this.article.languages['es'].title, [Validators.required]),
      esContent: new FormControl(this.article.languages['es'].content, [Validators.required]),
      enTitle: new FormControl(this.article.languages['en'].title),
      enContent: new FormControl(this.article.languages['en'].content),
    });
  }

  changeLanguage(lang){
    this.language = lang;
  }

  showEdit(){
    this.editing = true;
  }
  hideEdit(){
    this.editing = false;
  }

  save(){
    if (this.form.invalid) {
      Object.keys(this.form.controls).every(
        field => {
          const control = this.form.get(field);
          if(control.status === 'INVALID'){
            control.markAsTouched({ onlySelf: true });
            return false;
          }
          return true;
        });
      return;
    }
    this.sending = true;
    const formValue = this.form.value;
    const payload = {
      article: {
        practice_area_id: formValue.practice_area_id,
        image_id: formValue.image_id
      },
      translation: {
        fields: [
          {
            lang: 'es',
            title: formValue.esTitle,
            content: formValue.esContent
          },
          {
            lang: 'en',
            title: formValue.enTitle !== '' ? formValue.enTitle : formValue.esTitle,
            content: formValue.enContent !== '' ? formValue.enContent : formValue.esContent
          }
        ]
      },
      tag: {
        values: formValue.tags.map(item => item.id)
      }
    };
    this.articleService.update(this.article.id, payload).subscribe(
      response => {
        this.article = response;
        this.sending = false;
        this.notification.show('El artículo se ha editado satisfactoriamente', {type:NOTIFICATION_TYPE.SUCCESS});
        this.hideEdit();
      },
      error=>{
        console.log(error);
        this.notification.show('El artículo no se ha podido editar', {type:NOTIFICATION_TYPE.FAILED});
      }
    );
  }

  publish(){
    this.sending = true;
    this.articleService.publish(this.article.id).subscribe(
      response => {
        this.article.status = response['status'];
        this.sending = false;
        this.notification.show('El artículo se a publicado satisfactoriamente', {type:NOTIFICATION_TYPE.SUCCESS});
      },
      error => {
        console.log(error);
        this.sending = false;
      }
    );
  }

  unpublish(){
    this.sending = true;
    this.articleService.unpublish(this.article.id).subscribe(
      response => {
        this.article.status = response['status'];
        this.sending = false;
        this.notification.show('El artículo a dejado de ser público', {type:NOTIFICATION_TYPE.SUCCESS});
      },
      error => {
        console.log(error);
        this.sending = false;
      }
    );
  }
}
