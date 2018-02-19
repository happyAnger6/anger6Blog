import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authInfo: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.authInfo.getAuthorizationHeader();
    if (auth === null) {
      console.log('auth info is null');
      return null;
    }
    console.log('auth info:', auth);
    const authReq = req.clone({headers: req.headers.set('Authorization', auth)});
    return next.handle(authReq);
  }
}