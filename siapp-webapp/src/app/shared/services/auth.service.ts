import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { TOKEN_CONFIG as TOKEN } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/index';

@Injectable()
export class AuthService {

  baseUrl: string = host();
  //baseUrl: string = URL_CONF.baseURL;
  accessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService) { }

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

  setSession(username) {
    this.userService.findUserByName(username).subscribe(data => {
      const userDetails = JSON.stringify(data);
      const encodedSession = window.btoa(unescape(encodeURIComponent( userDetails )));
      window.sessionStorage.setItem('session', encodedSession);
    }, error => {
      console.log(error);
    });
  }
  getSession(): any {
    let decodedSession;
    let session = window.sessionStorage.getItem('session');
    if (session === null) {
      window.addEventListener('storage', (e) => {
        if (e.storageArea === sessionStorage) {
          console.log(e);
        }
      });
    } else {
      decodedSession = decodeURIComponent(escape(window.atob( session )));
      session = JSON.parse(decodedSession);
    }
    return session;
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('session');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
