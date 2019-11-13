import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/Article/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public language: string;
  public article: any;
  public menu;

  constructor(private activeRoute: ActivatedRoute, private articleService: ArticleService) {
    this.language = 'es';
    this.menu = [
      {id: 'details', title: 'Detalles', active: true},
      {id: 'tags', title: 'Etiquetas', active: false},
      {id: 'image', title: 'Imagen', active: false},
    ]
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

  activateMenu(id){
    this.menu.forEach(item =>{
      item.active = item.id === id ? true : false;
    })
  }

}
