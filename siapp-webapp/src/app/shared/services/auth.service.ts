import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { TOKEN_CONFIG as TOKEN } from '../core/service.global.config';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl: string = URL_CONF.baseURL;
  accessToken: string;

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('my-trusted-client:secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http.post<ApiResponse>(this.baseUrl + TOKEN.oauthKey, loginPayload, {headers});
  }

  isLoggedIn() {
    if (window.sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const authInfo = JSON.parse(window.sessionStorage.getItem('token'));
    const token = authInfo ? authInfo.access_token : '';
    return token;
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
