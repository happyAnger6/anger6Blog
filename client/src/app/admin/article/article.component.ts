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

  public newArticle = new Article('', '', '',
    [], '', 0, 0, [], Date.now());
  public allArticles: Article[] = [];

  public allCategories: Category[];
  public allShowCategories: ShowCategory[];

  constructor(private categoryService: CategoryService,
              private articleService: ArticleService) { }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length == 0)
      {
        comp.allCategories.push(new Category('根', '-1', [], 0));
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
  }

  onSelectNew() {
    this.selectedItem = 2;
  }

  onSelectList()  {
    let comp = this;
    this.selectedItem = 1;
    this.articleService.getAllArticles(function(err, all){
      comp.allArticles = all
    });
  }

  onAddArticle()  {
    this.articleService.addArticle(this.newArticle, function(err, result){

    })
  }

}
