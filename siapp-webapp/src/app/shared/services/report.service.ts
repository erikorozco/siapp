import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public readonly baseUrl: string = host() + URL_CONF.reportsAPI.name;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllTicketsReport(params: HttpParams): any {
    return this.http.get<any>(this.baseUrl + URL_CONF.reportsAPI.endpoints.ticketsAll + params.toString() );
  }

  getAllTicketsReportXlsx(params: HttpParams): any {
    params = params.set('exportFile', 'true');
    params = params.set('access_token', this.authService.getAuthorizationToken());
    let baseUrl = this.baseUrl + URL_CONF.reportsAPI.endpoints.ticketsAll + params.toString()
    console.log(baseUrl);
    window.open(baseUrl, '_blank');
  }
}
