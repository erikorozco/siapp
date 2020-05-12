import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionSessionService {

  baseUrl: string = host() + URL_CONF.nutritionSessionAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.nutritionSessionAPI.endpoints.get + id);
  }

  getByRecordId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.nutritionSessionAPI.endpoints.getByRecordId + id);
  }

  create(nutritionSession: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.nutritionSessionAPI.endpoints.create, nutritionSession);
  }

  update(id: number, nutritionSession: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.nutritionSessionAPI.endpoints.update + id, nutritionSession);
  }
}
