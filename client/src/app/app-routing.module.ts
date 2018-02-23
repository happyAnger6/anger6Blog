import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/menu', pathMatch: 'full',
  },
  {
    path: 'menu', component: MenuItemComponent,
  },
  {
    path: 'menu/:category', component: MenuItemComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
