import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs/index';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // baseUrl: string = URL_CONF.baseURL + URL_CONF.personsAPI.name;
  baseUrl: string = host() + URL_CONF.personsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.personsAPI.endpoints.getAll );
  }

  getPerson(id: number): Observable<any> {
    return this.http.get<ApiResponse>(this.baseUrl + URL_CONF.personsAPI.endpoints.getPerson + id);
  }

  createPerson(person: Person): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + URL_CONF.personsAPI.endpoints.createPerson, person);
  }

  updatePerson(id: number, person: Person): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + URL_CONF.personsAPI.endpoints.updatePerson + id, person);
  }

}
