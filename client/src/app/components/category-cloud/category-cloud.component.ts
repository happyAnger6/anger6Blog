import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-cloud',
  templateUrl: './category-cloud.component.html',
  styleUrls: ['./category-cloud.component.css']
})
export class CategoryCloudComponent implements OnInit {
  @Output() evSelectCategory = new EventEmitter<String>();

  public allCategories: string[] = [];

  constructor(private categoryService: CategoryService,
              private route: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
        comp.categoryService.getRootChildren(all).forEach((val, idx, ary) => {
          val.ChildrenNames.forEach((val, idx, ary) => {
            comp.allCategories.push(val);
          })
        })
    });
  }

  onSelectTag(cate) {
    this.route.navigate(['/menu', { category: cate}])
  }
}
