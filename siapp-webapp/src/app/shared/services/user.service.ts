import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';

@Injectable()
export class UserService {

  baseUrl: string = URL_CONF.baseURL + URL_CONF.usersAPI.name;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApiResponse> {
    // return this.http.get<ApiResponse>(this.baseUrl
    //                                 + URL_CONF.usersAPI.endpoints.getAll + `?${TOKEN.accessTokenKey}=`
    //                                 + JSON.parse(window.sessionStorage.getItem(TOKEN.tokenKey)).access_token);
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.usersAPI.endpoints.getAll );
  }

}
