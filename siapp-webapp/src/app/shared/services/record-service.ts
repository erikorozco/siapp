import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  baseUrl: string = URL_CONF.baseURL + URL_CONF.recordsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getRecordById(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.findRecordById + id);
  }

  getRecordsByTherapistId(therapistId: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.findRecordsByTherapistId + therapistId);
  }

  getRecordByPersonId(personId: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.findRecordByPersonId + personId);
  }

  getAllRecords(): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.getAll);
  }

  assignRecord(recordTherapistPermission: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.assignRecord, recordTherapistPermission);
  }

  removeRecordPermission(recordTherapistPermission: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.recordsAPI.endpoints.removeRecordPermission, recordTherapistPermission);
  }

}
