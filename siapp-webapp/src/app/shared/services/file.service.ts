import { Injectable } from '@angular/core';
import { host } from '../core/service.global.config';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl: string = host() + URL_CONF.personAttachmentsAPI.name;
  response = null;
  constructor(private http: HttpClient) {}

  getFile(personId, fileName): Observable<any> {
    let url = `${this.baseUrl}${URL_CONF.personAttachmentsAPI.endpoints.getFile(personId, fileName)}`;
    return this.http.get(url, {responseType: 'arraybuffer', observe: 'response'});
  }

  getImagesByPersonId(personId): Observable<any> {
    return this.http.get(this.baseUrl + URL_CONF.personAttachmentsAPI.endpoints.getImagesByPersonId + personId);
  }

  uploadFile(file: File, payload: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('personId', payload.personId);
    formData.append('therapistId', payload.therapistId);
    formData.append('description', payload.description);

    return this.http.post(this.baseUrl + URL_CONF.personAttachmentsAPI.endpoints.uploadFile,
                        formData,
                        {responseType: 'text', observe: 'response'}
                        );
  }

}
