import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

import { AdminRoutingModule } from './admin-routing.module';
import { SharesModule } from '../shares/shares.module'

import { AdminMainComponent } from './admin-main/admin-main.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { CategoryAddChaptersComponent } from './category-add-chapters/category-add-chapters.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    SharesModule,
    AdminRoutingModule
  ],
  declarations: [AdminMainComponent, CategoryComponent, ArticleComponent, CategoryAddChaptersComponent]
})
export class AdminModule { }
