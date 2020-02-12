import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable()
export class UserService {

  // baseUrl: string = URL_CONF.baseURL + URL_CONF.usersAPI.name;
  baseUrl: string = host() + URL_CONF.usersAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.getAll );
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

}
