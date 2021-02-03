import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class UserService {

  baseUrl: string = host() + URL_CONF.usersAPI.name;
  response = null;
  signedUserInfo = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) {
    // Load user info for signed user If has not been initialized
    if (!this.signedUserInfo.value) {
      this.initializeUserInfo();
    }
  }

  initializeUserInfo () {
    this.getTokenDetails().toPromise().then((res) => {
      if (res) {
        this.signedUserInfo.next(res);
      }
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.usersAPI.endpoints.getAll );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.getUser + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.createUser, user);
  }

  updateUser(id: number, user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.updateUser + id, user);
  }

  updateUserStatus(id: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.updateUserStatus + id, {});
  }

  findUserByName(username: string): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.findUserByName + username);
  }

  getTokenDetails() {
    return this.http.get<any>(this.baseUrl + URL_CONF.usersAPI.endpoints.tokenDetails);
  }
}
