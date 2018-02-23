import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { Category } from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public allRootCategories: Category[] = [];

  constructor(private categoryService: CategoryService,
  ) {}

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length != 0)
      {
        comp.allRootCategories = comp.categoryService.getRootChildren(all);
      }
    });
  }

  ngOnInit() {
    this.refreshData();
  }
}
