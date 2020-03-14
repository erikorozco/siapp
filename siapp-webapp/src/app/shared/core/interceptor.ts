import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {  tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Injectable} from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isLoggedIn() && !request.url.includes('oauth/token')) {
      const token = this.authService.getAuthorizationToken();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(
      tap(event => {
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        } else if (error.status === 0) {
          this.router.navigate(['login']);
          this.toastr.warning('TU SESIÓN HA TERMINADO');
        } else if (error.status === 403) {
          this.router.navigate(['home']);
          this.toastr.error('No cuentas con los accesos necesarios para acceder a este módulo', 'Acceso restringido');
        }
      })
    );
  }
}
