import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrisisInterventionService {

  baseUrl: string = host() + URL_CONF.crisisInterventionsAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.crisisInterventionsAPI.endpoints.get + id);
  }

  getByPersonId(personId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.crisisInterventionsAPI.endpoints.getByPersonId + personId);
  }

  create(crisisIntervention: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.crisisInterventionsAPI.endpoints.create, crisisIntervention);
  }

  update(id: number, crisisIntervention: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.crisisInterventionsAPI.endpoints.update + id, crisisIntervention);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.crisisInterventionsAPI.endpoints.delete + id);
  }

}
