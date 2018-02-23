import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category';
import { PathNavService } from '../../service/path-nav.service';
import { Path } from '../../models/path';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Output() evSelectMenu = new EventEmitter<String>();

  public allRootCategories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private pathService: PathNavService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    let comp = this;
    this.categoryService.getAllCategories(function(err, all){
      if (all.length != 0)
      {
        comp.allRootCategories = comp.categoryService.getRootChildren(all);
      }
    });
  }

  onSelectMenu(item) {
    this.pathService.clearPaths();
    this.pathService.addPath(new Path('Home', '/', 0));
    this.pathService.addPath(new Path(item, '/menu/' + item, 0));
    this.evSelectMenu.emit(item);
  }
}
