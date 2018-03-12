import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ShowChapter } from '../../models/showChapter';
import { ArticleService } from '../../service/article.service';
import {Article} from '../../models/article';

@Component({
  selector: 'app-chapters-sections-menu',
  templateUrl: './chapters-sections-menu.component.html',
  styleUrls: ['./chapters-sections-menu.component.css']
})
export class ChaptersSectionsMenuComponent implements OnInit {

  @Input() category: string;
  @Input() allChapters: ShowChapter[];
  @Output() evSelectedArticle = new EventEmitter<Article>();
  public expandNames: string[] = [];
  constructor(private categoryService: CategoryService,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.onExpandAll();
    this.onSelectItem(this.category, 0, 0);
  }

  onExpandChapter(name) {
    let index = this.expandNames.indexOf(name);
    if(-1===index){
      this.expandNames.push(name);
    }
    else {
      this.expandNames.splice(index,1);
    }
  }

  onExpandAll() {
    this.expandNames = [];
    for (let chapter of this.allChapters) {
      this.expandNames.push(chapter.Name);
    }
  }

  onExpandNone() {
    this.expandNames = [];
  }

  isExpanded(name) {
    for(let val of this.expandNames) {
      if (val === name) {
        return true;
      }
    }
    return false;
  }

  onSelectItem(category, chapter, section) {
    let comp = this;
    this.articleService.getArticlesByChapterSection(category, chapter, section)
      .subscribe(result => {
        if(result && result.length === 1) {
          comp.evSelectedArticle.emit(result[0]);
        }
      })
  }
}
