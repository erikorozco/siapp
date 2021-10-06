import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ServiceTypesService } from '../service-types.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeDataService {
  externalAreas = [
    'CAPA',
    'HOSPITAL REGIONAL',
    'IMSS',
    'DIF'
  ]  
  serviceTypes = new BehaviorSubject<Array<any>>([]);
  allServices = new BehaviorSubject<Array<any>>([]);

  constructor(
    private httpServiceTypesService: ServiceTypesService
  ) {
    this.fetchServiceTypes();
  }

  fetchServiceTypes() {
    this.httpServiceTypesService.getAll().toPromise().then((data) => {
      const filteredServiceTypes = data.filter(serviceType => serviceType.active).map((serviceType) => {
        return {
          value: serviceType.id,
          label: serviceType.label,
        }
      });
      this.serviceTypes.next(filteredServiceTypes);
    }, (error) => {
      console.log(error);
    });
  }
}
