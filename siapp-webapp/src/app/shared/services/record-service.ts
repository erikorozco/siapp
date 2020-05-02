import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  // baseUrl: string = URL_CONF.baseURL + URL_CONF.recordsAPI.name;
  baseUrl: string = host() + URL_CONF.recordsAPI.name;
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

  createRecord(record: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.recordsAPI.endpoints.createRecord, record);
  }

  uploadGenogram(file: File, recordId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('recordId', recordId.toString());
    // const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.baseUrl + URL_CONF.recordsAPI.endpoints.uploadGenogram, formData, {responseType: 'json'});
  }

}
