import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../service/article.service';
import {PathNavService} from "../../service/path-nav.service";
import {Path} from "../../models/path";

@Component({
  selector: 'app-article-pages',
  templateUrl: './article-pages.component.html',
  styleUrls: ['./article-pages.component.css']
})
export class ArticlePagesComponent implements OnInit {

  @Input() allArticles: Article[];
  @Output() evSelectedArticle = new EventEmitter<Article>();
  @Output() evNextPage = new EventEmitter<number>();

  public selectedArticle: Article;

  constructor(private articleService: ArticleService,
              private pathService: PathNavService) { }

  ngOnInit() {
  }

  onLike(article) {
    this.articleService.addLikes(article._id)
      .subscribe(result => {
        article.Likes++;
      })
  }

  onUnLike(article) {
    this.articleService.addUnLikes(article._id)
      .subscribe(result => {
          article.UnLikes++;
      })
  }

  selectArticle(article) {
    this.pathService.addPath(new Path(article.Title, '#', -1));
    this.evSelectedArticle.emit(article);
  }

  onCurPage(page) {
    this.evNextPage.emit(page);
  }
}
