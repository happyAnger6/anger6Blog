import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { CategoryService } from './service/category.service';

import { AuthInterceptor } from './shared/authInterceptor';
import { TimingInterceptor } from './shared/timingInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CategoryService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
