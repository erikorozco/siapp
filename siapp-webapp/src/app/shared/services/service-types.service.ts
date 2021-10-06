import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypesService {
  baseUrl: string = host() + URL_CONF.serviceTypesAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.serviceTypesAPI.endpoints.getById + id);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.serviceTypesAPI.endpoints.getAll);
  }

  create(serviceType: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.serviceTypesAPI.endpoints.create, serviceType);
  }

  update(id: number, serviceType: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.serviceTypesAPI.endpoints.update + id, serviceType);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.serviceTypesAPI.endpoints.delete + id);
  }
}
