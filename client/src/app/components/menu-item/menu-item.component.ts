import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ArticleService } from '../../service/article.service';
import 'rxjs/add/operator/switchMap';
import {Article} from "../../models/article";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../models/category";
import {PathNavService} from "../../service/path-nav.service";
import {Path} from "../../models/path";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  public menu_item: string;
  public allArticles: Article[] = [];
  public allRootCategories: Category[] = [];
  public selectedArticle;
  public paths;

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length != 0)
      {
        comp.allRootCategories = comp.categoryService.getRootChildren(all);
      }
    });
  }

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private pathService: PathNavService,
              private route: ActivatedRoute) { }

  initPaths(item) {
    this.pathService.clearPaths();
    this.pathService.addPath(new Path('Home', '/', 0));
    this.pathService.addPath(new Path(item, '/menu/' + item, 0));
  }

  ngOnInit() {
    this.selectedArticle = null;
    let comp = this;
    //this.refreshData();


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        comp.menu_item = params.get('category');
        comp.initPaths(comp.menu_item);
        comp.paths = this.pathService.getPaths();
        return comp.articleService.getArticlesByCategory(comp.menu_item);
      })
      .subscribe(result => {
        comp.allArticles = result;
      },
      err => {
      }
    )
  }

  onSelectedMenu(item) {
    let comp = this;
    this.selectedArticle = null;
    this.paths = this.pathService.getPaths();
    this.articleService.getArticlesByCategory(item)
      .subscribe(result => {
        comp.allArticles = result;
      },
      err => {

      })
  }

  onSelectArticle(article) {
    this.selectedArticle = article;
  }
}
