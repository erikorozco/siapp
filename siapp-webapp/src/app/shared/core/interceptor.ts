import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { map, filter, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authInfo = JSON.parse(window.sessionStorage.getItem('token'))
    const token = authInfo ? authInfo.access_token : '';

    console.log(request);

    if (token && !request.url.includes('oauth/token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
        }
      });
    }

    /*return next.handle(request).pipe/*.do(
      (err: any) => {
        //if (err instanceof HttpErrorResponse) {
          console.log(request);
          if (err.status === 401) {
            this.router.navigate(['login']);
          }
        }
      //}
    );*/

    return next.handle(request).pipe(
      tap(event => {
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
