import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from "ng2-ckeditor";

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    AdminRoutingModule
  ],
  declarations: [AdminMainComponent, CategoryComponent, ArticleComponent]
})
export class AdminModule { }
