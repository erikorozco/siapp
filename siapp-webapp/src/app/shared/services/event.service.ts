import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public readonly baseUrl: string = host() + URL_CONF.eventsAPI.name;
  public readonly eventsFilterUrl = this.baseUrl + URL_CONF.eventsAPI.endpoints.filter;
  response = null;
  constructor(private http: HttpClient) {}

  filterEvents(params: HttpParams): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.eventsFilterUrl + params.toString() );
  }

  getEvent(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.eventsAPI.endpoints.getEvent + id);
  }

  createEvent(event: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.eventsAPI.endpoints.createEvent, event);
  }

  updateEvent(id: number, event: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.eventsAPI.endpoints.updateEvent + id, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.eventsAPI.endpoints.deleteEvent + id);
  }
}
