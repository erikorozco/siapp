import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherTicketService {
  baseUrl: string = host() + URL_CONF.otherTicketsAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.otherTicketsAPI.endpoints.getOtherTicket + id);
  }

  filterTickets(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.otherTicketsAPI.endpoints.filter + params.toString() );
  }

  create(otherTicket: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.otherTicketsAPI.endpoints.createOtherTicket, otherTicket);
  }

  update(id: number, otherTicket: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.otherTicketsAPI.endpoints.updateOtherTicket + id, otherTicket);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.otherTicketsAPI.endpoints.deleteOtherTicket + id);
  }
}
