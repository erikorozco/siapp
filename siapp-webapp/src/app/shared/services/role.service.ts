import { Injectable } from '@angular/core';
import { host } from '../core/service.global.config';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl: string = host() + URL_CONF.rolesAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.rolesAPI.endpoints.getAll );
  }

}
