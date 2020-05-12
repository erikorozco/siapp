import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  baseUrl: string = host() + URL_CONF.surveyAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  getSurvey(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.surveyAPI.endpoints.getSurvey + id);
  }

  getBySurveyByDerivationId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.surveyAPI.endpoints.getBySurveyByDerivationId + id);
  }

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.surveyAPI.endpoints.create, survey);
  }

  updateSurvey(id: number, survey: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.surveyAPI.endpoints.update + id, survey);
  }
}
