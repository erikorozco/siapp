import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalReleaseService {

  baseUrl: string = host() + URL_CONF.medicalReleaseAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  getMedicalRelease(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.medicalReleaseAPI.endpoints.getMedicalRealease + id);
  }

  getByMedicalReleaseByDerivationId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.medicalReleaseAPI.endpoints.getByMedicalReleaseByDerivationId + id);
  }

  createMedicalRelease(medicalRelease: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.medicalReleaseAPI.endpoints.create, medicalRelease);
  }

  updateMedicalRelease(id: number, medicalRelease: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.medicalReleaseAPI.endpoints.update + id, medicalRelease);
  }
}
