import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Article } from '../../models/article';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  public articleID;
  @Input() article;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) { }


  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.articleID = params.get('id');
        if(!this.articleID) return null;
        console.log('id: ', this.articleID)
        return this.articleService.getArticlesById(this.articleID)
      })
      .subscribe(result => {
        this.article = result;
       },
        err => {
      }
    );
  }

}
