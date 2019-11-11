import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ArticleService} from '../../services/Article/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public form;
  public articles;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngOnInit() {
    this.articleService.articles.subscribe(
      response => {
        this.articles = response;
      }
    )
  }

}
