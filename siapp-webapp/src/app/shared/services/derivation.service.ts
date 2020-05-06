import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.response';

@Injectable({
  providedIn: 'root'
})
export class DerivationService {

  baseUrl: string = host() + URL_CONF.derivationAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.derivationAPI.endpoints.getDerivation + id);
  }

  getDerivationByRecordId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.derivationAPI.endpoints.getDerivationByRecordId + id);
  }

  createDerivation(derivation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.derivationAPI.endpoints.createDerivation, derivation);
  }

  createDerivations(derivations: any[]): Observable<any> {
    return this.http.post(this.baseUrl + URL_CONF.derivationAPI.endpoints.createDerivations, derivations, {responseType: 'text', observe: 'response'});
  }

  updateDerivation(id: number, derivation: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.derivationAPI.endpoints.updateDerivation + id, derivation);
  }

}
