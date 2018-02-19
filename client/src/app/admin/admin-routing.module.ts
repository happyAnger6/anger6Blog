import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { CategoryComponent } from './category/category.component';

import { AuthGuardService } from '../service/auth-guard.service';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminMainComponent,
    canActivate: [AuthGuardService],
    children: [
        {   path: 'categories',
            component: CategoryComponent 
        }, 
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }
