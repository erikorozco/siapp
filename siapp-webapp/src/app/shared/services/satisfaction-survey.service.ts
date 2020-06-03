import { Injectable } from '@angular/core';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatisfactionSurveyService {

  baseUrl: string = host() + URL_CONF.satisfactionSurveyAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.satisfactionSurveyAPI.endpoints.get + id);
  }

  getByDerivationId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.satisfactionSurveyAPI.endpoints.getBySurveyByDerivationId + id);
  }

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.satisfactionSurveyAPI.endpoints.create, survey);
  }

  updateSurvey(id: number, survey: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.satisfactionSurveyAPI.endpoints.update + id, survey);
  }

}
