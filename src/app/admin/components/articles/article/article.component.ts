import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/article/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public language: string;
  public article: any;
  public sending: boolean;

  constructor(private activeRoute: ActivatedRoute, private articleService: ArticleService) {
    this.language = 'es';
    this.sending = false;
  }

  ngOnInit() {
    const articleId = this.activeRoute.snapshot.params.id;
    this.articleService.article(articleId).subscribe(
      response => {
        this.article = response;
      }
    );
  }

  changeLanguage(lang){
    this.language = lang;
  }

  publish(){
    this.sending = true;
    this.articleService.publish(this.article.id).subscribe(
      response => {
        this.article.status = response['status'];
        this.sending = false;
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
      },
      error => {
        console.log(error);
        this.sending = false;
      }
    );
  }
}
