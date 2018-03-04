import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pages-menu',
  templateUrl: './pages-menu.component.html',
  styleUrls: ['./pages-menu.component.css']
})
export class PagesMenuComponent implements OnInit {

  @Input() curPage: number;
  @Input() totalPages: number;

  @Output() evNextPage = new EventEmitter<number>();
  @Output() evPrePage = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onPrePage() {
    if(this.curPage - 1 >= 1) {
      this.curPage--;
      this.evPrePage.emit(this.curPage);
    }
  }

  onNextPage() {
    if(this.curPage + 1 <= this.totalPages) {
      this.curPage++;
      this.evNextPage.emit(this.curPage);
    }
  }
}
