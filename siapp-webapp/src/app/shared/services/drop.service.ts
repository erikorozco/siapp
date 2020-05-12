import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropService {

  baseUrl: string = host() + URL_CONF.dropAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  getDrop(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.dropAPI.endpoints.getDrop + id);
  }

  getByDropByDerivationId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.dropAPI.endpoints.getByDropByDerivationId + id);
  }

  createDrop(drop: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.dropAPI.endpoints.create, drop);
  }

  updateDrop(id: number, drop: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.dropAPI.endpoints.update + id, drop);
  }

}
