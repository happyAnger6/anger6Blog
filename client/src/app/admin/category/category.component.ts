import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Category } from '../../models/category';
import { ShowCategory } from '../../models/showCategory';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  public newCategory = new Category('', '根', [], 0, []);
  public addChapterCategory: Category;
  public allCategories:  Category[] = [];
  public allShowCategories:  ShowCategory[] = [];

  public oper = 0;
  public edit = 0;

  constructor(private categoryService: CategoryService,
  ) { }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length == 0)
      {
        comp.allCategories.push(new Category('根', '-1', [], 0, []));
      }
      else
      {
        comp.allCategories = all;
      }
      comp.allShowCategories = comp.categoryService.getAllShowCategories(comp.allCategories);
    });
  }

  ngOnInit() {
    this.refreshData();
  }

  onSelectNew() {
    this.oper = 2;
  }

  onSelectList()  {
    let comp = this;
    this.oper = 1;
    this.refreshData();
  }

  onAddCategory() {
    let comp = this;
    console.log(comp.newCategory);
    this.categoryService.addCategory(this.newCategory, function(err, result){
      if (err === null) {
        comp.refreshData();
      }
    })
  }

  onEditCategory(id) {
    console.log(id);
  }

  onDeleteCategory(id) {
    console.log(id);
    let comp = this;
    this.categoryService.delCategory(id, function(err, result){
      if (err != null) {
        console.log("err: ", err);
      }
      comp.refreshData();
    })
  }

  onAddChapters(cate) {
    this.edit = 1;
    this.addChapterCategory = cate;
  }
}
