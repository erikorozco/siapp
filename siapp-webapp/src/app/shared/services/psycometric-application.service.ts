import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsycometricApplicationService {

  baseUrl: string = host() + URL_CONF.psycometricsApplicationAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.psycometricsApplicationAPI.endpoints.get + id);
  }

  getByPersonId(personId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.psycometricsApplicationAPI.endpoints.getByPersonId + personId);
  }

  create(psycometricApplication: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.psycometricsApplicationAPI.endpoints.create, psycometricApplication);
  }

  update(id: number, psycometricApplication: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.psycometricsApplicationAPI.endpoints.update + id, psycometricApplication);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.psycometricsApplicationAPI.endpoints.delete + id);
  }
  
}
