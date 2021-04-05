import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  public readonly baseUrl: string = host() + URL_CONF.agendaAPI.name;
  public readonly agendasFilterUrl = this.baseUrl + URL_CONF.agendaAPI.endpoints.filter;
  response = null;
  constructor(private http: HttpClient) {}

  filterAgendas(params: HttpParams): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.agendasFilterUrl + params.toString() );
  }

  getAgenda(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.agendaAPI.endpoints.getAgenda + id);
  }

  createAgenda(agenda: IAppointmentApiDataModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.agendaAPI.endpoints.createAgenda, agenda);
  }

  updateAgenda(id: number, agenda: IAppointmentApiDataModel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.agendaAPI.endpoints.updateAgenda + id, agenda);
  }

  deleteAgenda(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.agendaAPI.endpoints.deleteAgenda + id);
  }
}

export interface IAppointmentApiDataModel {
  id?: string;
  date: string | Date;
  startDate: string | Date;
  endDate: string | Date;
  notes?: string;
  person: {
    id: string;
  };
  therapist: {
    id: string;
  };
  time?: string;
  duration?: string; // Userd to specify if it is an all_day event
  version?: string;
  assisted?: boolean;
}
