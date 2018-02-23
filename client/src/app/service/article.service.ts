import { Injectable } from '@angular/core';
import { Article } from '../models/article';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ARTICLES_URI, API_CATEGORIES_URI, API_URI } from '../shared/httpApi';
import { Category } from '../models/category';

@Injectable()
export class ArticleService {
  public curArticle: Article;
  constructor(private http: HttpClient) { }

  setCurArticle(article) {
    this.curArticle = article;
  }

  getCurArticle() {
    return this.curArticle;
  }

  getAllArticles(fn) {
    this.http.get<Article[]>(API_ARTICLES_URI + 'json',
    )
      .subscribe(data => {
        fn(null, data);
      });
  }

  // 获取某个组件的用户信息
  getArticlesByCategory(category: string) {
    return this.http.get<Article[]>(API_ARTICLES_URI + 'json?category=' + category)
  }

  getArticlesById(id) {
    return this.http.get<Article[]>(API_ARTICLES_URI + id + '/json')
  }

  addArticle(newArticle: Article, fn) {
    this.http.post(API_ARTICLES_URI + 'create', newArticle)
      .subscribe(result => {
          fn(null, result);
        },
        err => {
          fn(err, null);
        }
      )
  }

  addLikes(id) {
    return this.http.post(API_ARTICLES_URI + id + '/likes', null)
  }

  addUnLikes(id) {
    return this.http.post(API_ARTICLES_URI + id + '/unlikes', null)
  }
}
