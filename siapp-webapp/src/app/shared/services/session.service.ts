import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl: string = host() + URL_CONF.sessionsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getSessionsByRecordId(recordId: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.sessionsAPI.endpoints.getSessionsByRecordId + recordId);
  }

  getSession(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.sessionsAPI.endpoints.getSession + id);
  }

  createSession(session): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.sessionsAPI.endpoints.createSession, session);
  }

  updateSession(id: number, session): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.sessionsAPI.endpoints.updateSession + id, session);
  }

}
