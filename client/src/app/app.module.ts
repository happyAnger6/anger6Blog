import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { SharesModule } from './shares/shares.module'

import { AppComponent } from './app.component';

import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { CategoryService } from './service/category.service';
import { ArticleService } from './service/article.service';
import { PathNavService } from './service/path-nav.service';
import { ChapterService } from './service/chapter.service';
import { SectionService } from './service/section.service';

import { AuthInterceptor } from './shared/authInterceptor';
import { TimingInterceptor } from './shared/timingInterceptor';

import { CKEditorModule } from 'ng2-ckeditor';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { AsideComponent } from './components/aside/aside.component';
import { ArticlePagesComponent } from './components/article-pages/article-pages.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { PathNavComponent } from './components/path-nav/path-nav.component';
import { NewestArticlesComponent } from './components/newest-articles/newest-articles.component';
import { MyHomesComponent } from './components/my-homes/my-homes.component';
import { BlogSourcesComponent } from './components/blog-sources/blog-sources.component';
import { CategoryCloudComponent } from './components/category-cloud/category-cloud.component';
import { MyProjectsListComponent } from './components/my-projects-list/my-projects-list.component';
import { ChaptersSectionsMenuComponent } from './components/chapters-sections-menu/chapters-sections-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    AsideComponent,
    ArticlePagesComponent,
    ArticleDetailsComponent,
    MenuListComponent,
    PathNavComponent,
    NewestArticlesComponent,
    MyHomesComponent,
    BlogSourcesComponent,
    CategoryCloudComponent,
    MyProjectsListComponent,
    ChaptersSectionsMenuComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    AdminModule,
    SharesModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CategoryService,
    ChapterService,
    SectionService,
    ArticleService,
    PathNavService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
