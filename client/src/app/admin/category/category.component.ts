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
  public allRootCategories: Category[];
  public allShowCategories:  ShowCategory[] = [];
  public addParent: Category;
  public editCategory: Category;

  public oper = 0;
  public edit = 0; //1.edit category 2.add chapter and section for category
  public addSub = 0;

  constructor(private categoryService: CategoryService,
  ) { }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length === 0)
      {
        comp.allCategories.push(new Category('根', '-1', [], 0, []));
      }
      else
      {
        comp.allCategories = all;
      }
      comp.allShowCategories = comp.categoryService.getAllShowCategories(comp.allCategories);
      comp.allRootCategories = comp.categoryService.getAllRootCategories(comp.allCategories);
    });
  }

  ngOnInit() {
    this.addSub = 0;
    this.refreshData();
  }

  onSelectNew() {
    this.addSub = 0;
    this.oper = 2;
  }

  onSelectList()  {
    this.addSub = 0;
    let comp = this;
    this.oper = 1;
    this.refreshData();
  }

  onAddCategory() {
    let comp = this;
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
    this.edit = 2;
    this.addChapterCategory = cate;
  }

  getAllChildren(category) {
    return this.categoryService.getAllChildren(this.allCategories, category);
  }

  onAddSubCategory(parent) {
      this.addSub = 1;
      this.addParent = parent;
  }

  addComplete(result) {
    if (result === 0) {
      this.refreshData();
    }
    this.addParent = null;
  }

  editSubCategory(subcate) {
   this.edit = 1;
   this.editCategory = subcate;
  }

  deleteCategory(subcate) {
    this.categoryService.delCategory(subcate._id, function(err, result){

    })
  }

  addChapterSectionForCategory(cate) {
    this.addChapterCategory = cate;
  }

  cancelEditSubCategory(subcate) {
    this.edit = 0;
    this.editCategory = null;
  }

  confirmEditSubCategory(subcate) {
    this.categoryService.updateCategory(subcate)
      .subscribe(result => {
        this.edit = 0;
        this.editCategory = null;
      })
  }
}
