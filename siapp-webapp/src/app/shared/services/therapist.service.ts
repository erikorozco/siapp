import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  baseUrl: string = URL_CONF.baseURL + URL_CONF.therapistsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getTherapist(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.therapistsAPI.endpoints.getTherapist + id);
  }

}
