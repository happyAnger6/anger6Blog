import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category-add-chapters',
  templateUrl: './category-add-chapters.component.html',
  styleUrls: ['./category-add-chapters.component.css']
})
export class CategoryAddChaptersComponent implements OnInit {

  @Input() category: Category;
  constructor() { }

  ngOnInit() {
  }

}
