import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullcalendarApiService {

  fullcalendarAPI = new BehaviorSubject(undefined);

  constructor() { }

  refetchEvents() {
    if(this.fullcalendarAPI.value) {
      const calendarApi = this.fullcalendarAPI.value;
      calendarApi.refetchEvents();
    }
  }
}
