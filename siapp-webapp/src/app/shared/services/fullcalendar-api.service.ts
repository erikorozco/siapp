import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullcalendarApiService {

  /**
   * Used to store the state of the FullCalendarComponent API
   *
   * @memberof FullcalendarApiService
   */
  fullcalendarAPI = new BehaviorSubject(undefined);

  constructor() { }

  refetchEvents() {
    if(this.fullcalendarAPI.value) {
      const calendarApi = this.fullcalendarAPI.value;
      calendarApi.refetchEvents();
    }
  }

  navigateToView(view: string, date: Date) {
    if (this.fullcalendarAPI.value) {
      const calendarApi = this.fullcalendarAPI.value;
      calendarApi.changeView(view, date);
    }
  }
}
