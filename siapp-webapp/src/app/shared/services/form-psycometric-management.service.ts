import { Injectable } from '@angular/core';
import { API_URL_CONFIG as URL_CONF } from '../core/service.global.config';
import { host } from '../core/service.global.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormPsycometricManagementService {

  baseUrl: string = host() + URL_CONF.psycometricsManagementAPI.name;
  response = null;
  constructor(
    private http: HttpClient
  ) {}

  get(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.get + id);
  }

  getAllActive(): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.getAllActive);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.getAll);
  }

  create(psycometricConfiguration: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.create, psycometricConfiguration);
  }

  update(id: number, psycometricConfiguration: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.update + id, psycometricConfiguration);
  }

  updateStatus(id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.updateStatus + id, {});
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + URL_CONF.psycometricsManagementAPI.endpoints.delete + id);
  }

  formConfigToFormGroup(formConfigPayload) {
    let group: any = {};
    formConfigPayload.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
      : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  getPsycometricFormConfig(): any {
    return {
      id: 1,
      payload: [
        {
          key: 'test-1',
          controlType: 'dropdown',
          label: '¿Que tan bueno eres del 1 al 2?',
          value: null,
          options: [
            {key: '1',  value: 'Bueno'},
            {key: '2',  value: 'Muy bueno'}
          ],
          order: 1
        },
        {
          key: 'test-2',
          controlType: 'textbox',
          label: 'Como te llamas?',
          value: '',
          required: true,
          order: 1
        },
        {
          key: 'test-3',
          controlType: 'textarea',
          label: 'pon la descirpcion aqui',
          value: '',
          required: true,
          order: 1
        }
      ],
      name: "B2",
      codigo: "test",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos quaerat ipsum, laudantium repellendus sed quos, officiis aliquam esse nulla iste molestiae laborum doloribus dignissimos. Incidunt quia corporis cumque voluptatibus impedit!"
    }
  }
}
