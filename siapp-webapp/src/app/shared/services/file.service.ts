import { Injectable } from '@angular/core';
import { host } from '../core/service.global.config';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl: string = host() + URL_CONF.recordsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getFile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/files/ImageTestSIapp.png', {responseType: 'arraybuffer', observe: 'response'});
  }

}
