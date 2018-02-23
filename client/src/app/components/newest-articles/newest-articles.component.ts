import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";

@Component({
  selector: 'app-newest-articles',
  templateUrl: './newest-articles.component.html',
  styleUrls: ['./newest-articles.component.css']
})
export class NewestArticlesComponent implements OnInit {

  public articles: Article[] = [];
  constructor() { }

  ngOnInit() {
  }

}
