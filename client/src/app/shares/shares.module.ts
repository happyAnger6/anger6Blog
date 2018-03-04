import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesMenuComponent } from './pages-menu/pages-menu.component'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PagesMenuComponent ],
  exports: [ PagesMenuComponent ]
})
export class SharesModule { }
