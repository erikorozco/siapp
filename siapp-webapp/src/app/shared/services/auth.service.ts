import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { TOKEN_CONFIG as TOKEN } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {

  readonly RECEPTION_MODULE = 'receptionModule';
  readonly ADMIN_MODULES = 'adminModule';

  baseUrl: string = host();
  accessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

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
    window.sessionStorage.removeItem('session');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  /**
   * TO-DO: set the roles to session instead of hitting the API. Change logic on the implementer components.
   * This method is used to grant modules permissions at component level
   * Use isAllowedToPerformAction instead isAllowed
   * @param roles [{name: 'rolNanme'}...]
   * @param module ADMIN, ADMINISTRATIVE, USER
   */
  isAllowed(roles: any[], module: string) {
    switch (module) {
      case this.RECEPTION_MODULE:
        return this.isAdministrative(roles);
      case this.ADMIN_MODULES:
          return this.isAdmin(roles);
    }
  }

  private isAdministrative(roles: any[]) {
    const isAdminRoleFound = roles.find(role => role.name === 'ADMINISTRATIVE');
    return isAdminRoleFound ? true : false;
  }

  private isAdmin(roles: any[]) {
    const isAdminRoleFound = roles.find(role => role.name === 'ADMIN');
    return isAdminRoleFound ? true : false;
  }

  // TODO: Encode Session
  appendSession(key, value) {
    let session;
    if (window.sessionStorage.getItem('session') === null) {
      session = {};
    } else {
      session = this.getSession();
    }
    const sessionString = JSON.stringify(this.appendItem(key, value, session));
    //const encodedSession = window.btoa(unescape(encodeURIComponent( session )));
    window.sessionStorage.setItem('session', sessionString);
  }

  
  getSession(): any {
    const session = window.sessionStorage.getItem('session');
    //const decodedSession = decodeURIComponent(escape(window.atob( encodedSessionsession )));
    const sessionJson = JSON.parse(session);
    return sessionJson;
  }

  private appendItem(key, value, session) {
    session[key] = value;
    return session;
  }

}
