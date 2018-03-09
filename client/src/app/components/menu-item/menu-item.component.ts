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
  public curPage = 1;
  public totalPages = 1;
  public pageItems = 5;

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
    if(!item || item === "Home") return;
    this.pathService.addPath(new Path(item, '/menu/' + item, 0));
  }

  initPages() {
    this.curPage = 1;
    this.totalPages = 1;
  }

  onGetArticlesByMenu(menu) {
    this.initPaths(menu);
    this.paths = this.pathService.getPaths();
    if (menu === null || menu === "Home") {
      return this.articleService.getArticles()
    }
    return this.articleService.getArticlesByCategory(menu);
  }

  ngOnInit() {
    this.initPages();

    this.selectedArticle = null;
    let comp = this;
    //this.refreshData();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        comp.menu_item = params.get('category');
        return this.onGetArticlesByMenu(comp.menu_item);
      })
      .subscribe(result => {
        comp.allArticles = result;
        comp.curPage = 1;
        comp.totalPages = Math.ceil(comp.allArticles.length/comp.pageItems);
        comp.allArticles = comp.allArticles.slice(0, comp.pageItems);
      },
      err => {
      }
    )
  }

  onSelectedMenu(item) {
    let comp = this;
    this.initPages();
    this.menu_item = item;
    this.selectedArticle = null;
    this.initPaths(item);
    this.paths = this.pathService.getPaths();
    this.onGetArticlesByMenu(item)
      .subscribe(result => {
        comp.allArticles = result;
        comp.totalPages = Math.ceil(comp.allArticles.length/comp.pageItems);
        comp.curPage = 1;
        comp.allArticles = comp.allArticles.slice(0, comp.pageItems);
      },
      err => {

      })
  }

  onPrePage(page) {
    let comp = this;
    if (this.menu_item && this.menu_item !== "Home") {
      this.articleService.getArticlesByCategoryByPage(this.menu_item, page)
        .subscribe(result => {
          if (result.length != 0) {
            comp.curPage--;
            comp.allArticles = result;
          }
        });
    }
    else {
      this.articleService.getAllArticlesByPage(page)
        .subscribe(result => {
          if (result.length != 0) {
            comp.curPage--;
            comp.allArticles = result;
          }
        });
    }
  }

  onNextPage(page) {
    let comp = this;
    if (this.menu_item && this.menu_item !== "Home") {
      this.articleService.getArticlesByCategoryByPage(this.menu_item, page)
        .subscribe(result => {
          if (result.length != 0) {
            comp.curPage++;
            comp.allArticles = result;
          }
        });
    }
    else {
      this.articleService.getAllArticlesByPage(page)
        .subscribe(result => {
          if (result.length != 0) {
            comp.curPage++;
            comp.allArticles = result;
          }
        });
    }
  }

  onSelectArticle(article) {
    this.initPages();
    this.selectedArticle = article;
  }

  setMainClass() {
    return {

    }
  }
}
