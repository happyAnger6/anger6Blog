import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';

import { CategoryService } from '../../service/category.service';
import { ArticleService } from '../../service/article.service';

import { Category } from '../../models/category';
import { ShowCategory } from '../../models/showCategory';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  public selectedItem = 0;
  public curPage = 0;
  public totalPages = 0;
  public pageItems = 5;

  public newArticle = new Article('', '', '安哥6',
    [], '', 0, 0, [], 0, 0, Date.now());
  public allArticles: Article[] = [];

  public allCategories: Category[];
  public allShowCategories: ShowCategory[];
  public selectedCategory: Category;

  public maxChapter: Array<number> = [];
  public maxSection: Array<number> = [];

  constructor(private categoryService: CategoryService,
              private articleService: ArticleService) { }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length == 0)
      {
        comp.allCategories.push(new Category('根', '-1', [], 0, []));
      }
      else
      {
        comp.allCategories = all
      }
      comp.allShowCategories = comp.categoryService.getAllShowCategories(comp.allCategories);
    });
  }

  ngOnInit() {
    this.refreshData();

    for(let i = 0; i < 31; i++) {
      this.maxChapter.push(i);
      this.maxSection.push(i);
    }
  }

  onSelectNew() {
    this.selectedItem = 2;
    this.totalPages = 0;
    this.curPage = 0;
  }

  onSelectList()  {
    let comp = this;
    this.selectedItem = 1;
    this.articleService.getAllArticles(function(err, all){
      comp.allArticles = all;
      comp.curPage = 1;
      comp.totalPages = Math.ceil(all.length /comp.pageItems);
      comp.allArticles = comp.allArticles.slice(0, comp.pageItems);
    });
  }

  onGetArticlesByPage() {
    let comp = this;
    this.articleService.getAllArticlesByPage(this.curPage)
      .subscribe(result => {
        comp.allArticles = result;
      })
  }
  onPrePage() {
    this.curPage--;
    this.onGetArticlesByPage();
  }

  onNextPage() {
    this.curPage++;
    this.onGetArticlesByPage();
  }

  onAddArticle()  {
    let comp = this;
    this.articleService.addArticle(this.newArticle, function(err, result){
      if (err == null) {
        comp.onSelectList();
      }
    })
  }

}
