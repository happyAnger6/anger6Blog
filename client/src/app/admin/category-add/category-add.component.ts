import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Category } from '../../models/category';
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  @Input() parent: Category;
  @Output() evAddResult = new EventEmitter<Number>();

  public newCategory: Category = new Category('', '根', [], 0, []);
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onAddCategory() {
      let comp = this;
      this.newCategory.ParentName = this.parent.Name;
      console.log(comp.newCategory);
      this.categoryService.addCategory(this.newCategory, function(err, result){
        if (err === null) {
          comp.evAddResult.emit(0);
        }
      })
  }
}
