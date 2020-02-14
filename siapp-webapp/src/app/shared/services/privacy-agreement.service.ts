import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class PrivacyAgreementService {

  // baseUrl: string = URL_CONF.baseURL + URL_CONF.privacyAgreementAPI.name;
  baseUrl: string = host() + URL_CONF.privacyAgreementAPI.name;
  constructor(private http: HttpClient) {}

  getPrivacyAgreement(personId: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.privacyAgreementAPI.endpoints.getPrivacyAgreement + personId);
  }

  createPrivacyAgreement(privacyAgreement: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.privacyAgreementAPI.endpoints.createPrivacyAgreement, privacyAgreement);
  }

}
