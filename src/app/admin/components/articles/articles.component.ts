import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ArticleService} from '../../services/article/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public form;
  public articles;
  public loading: boolean;


  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.loading = false;
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles(page = 1){
    this.loading = true;
    this.articleService.all(page).subscribe(
      response => {
        this.articles = response;
        this.loading = false;
      }
    )
  }

}
