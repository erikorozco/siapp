import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { ApiResponse } from '../models/api.response';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public readonly baseUrl: string = host() + URL_CONF.ticketsAPI.name;
  constructor(private http: HttpClient) {}

  filterTickets(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.ticketsAPI.endpoints.filter + params.toString() );
  }

  getTicket(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.ticketsAPI.endpoints.getTicket + id);
  }

  createTicket(ticket: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.ticketsAPI.endpoints.createTicket, ticket);
  }

  updateTicket(id: number, ticket: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.ticketsAPI.endpoints.updateTicket + id, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.ticketsAPI.endpoints.deleteTicket + id);
  }
}
