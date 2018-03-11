import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../service/category.service';
import {Chapter} from '../../models/chapter';
import {ChapterService} from '../../service/chapter.service';
import {Section} from "../../models/section";
import {ShowChapter} from "../../models/showChapter";
import {SectionService} from "../../service/section.service";

@Component({
  selector: 'app-category-add-chapters',
  templateUrl: './category-add-chapters.component.html',
  styleUrls: ['./category-add-chapters.component.css']
})
export class CategoryAddChaptersComponent implements OnInit {
  public allChapters: ShowChapter[];
  public newChapter  = new Chapter('', 1, '', [], 1);
  public selectChapter: ShowChapter;

  public newSection = new Section('', 1, '',  1);
  public operFlag = 0; //1.add chapter //2.add section

  public maxChapter: Array<number> = [];
  public maxSection: Array<number> = [];

  @Input() category: Category;
  constructor(private categoryService: CategoryService,
              private chapterService: ChapterService,
              private sectionService: SectionService) { }

  refreshData() {
    let comp = this;
    this.categoryService.getAllChapters(this.category)
      .subscribe(result => {
        comp.allChapters = result;
      });
  }

  ngOnInit() {
    this.refreshData();

    for(let i = 0; i < 30; i++) {
      this.maxChapter.push(i+1);
      this.maxSection.push(i+1);
    }
  }

  onAddChapter(chapter) {
    this.operFlag = 1;
  }

  onCancelAddChapter() {
    this.operFlag = 0;
  }

  onSubmitAddChapter() {
    this.newChapter.Category = this.category.Name;
    this.chapterService.addChapter(this.newChapter)
      .subscribe(result => {
        this.operFlag = 0;
        this.refreshData();
      })
  }

  onAddSection(chapter) {
    this.operFlag = 2;
    this.selectChapter = chapter;
  }

  onSubmitAddSection(chapter: ShowChapter) {
    this.newSection.Chapter = chapter._id;
    this.sectionService.addSection(this.newSection)
      .subscribe(result => {
        this.operFlag = 0;
        this.selectChapter = null;
        this.refreshData();
      })
  }

}
