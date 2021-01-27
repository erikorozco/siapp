import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FullCalendarEventFactory, ApiEventType } from '../factories/FullCalendarEventFactory';
import { DateTimeHelper } from '../utils/DateTimeHelper';
import { AgendaService } from './agenda.service';
import { AuthService } from './auth.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  eventSources;
  filterApiParams = new BehaviorSubject<FilterApiParams>(this.getInitialFiltersState());

  constructor(
    private dateTimeHelper: DateTimeHelper,
    private authService: AuthService,
    private agendaService: AgendaService,
    private eventService: EventService,
    public toastr: ToastrService,
  )
  {
    this.eventSources = [
      {
        url: this.agendaService.agendasFilterUrl,
        method: 'GET',
        extraParams: this.buildExtraParams({}, ApiEventType.Agenda),
        failure: () => {
          this.toastr.error('Ocurrio un error obteniendo las citas.', 'Operacion invalida');
        },
        eventDataTransform: this.agendaDataTransform
      },
      {
        url: this.eventService.eventsFilterUrl,
        method: 'GET',
        extraParams: this.buildExtraParams({}, ApiEventType.Event),
        failure: () => {
          this.toastr.error('Ocurrio un error obteniendo los eventos.', 'Operacion invalida');
        },
        eventDataTransform: this.eventDataTransform
      }
    ]
    console.log(this.filterApiParams.value);
  }

  getInitialFiltersState(): FilterApiParams {
    return {
      access_token: this.authService.getAuthorizationToken(),
      therapistId: undefined,
      personId: undefined,
      version: undefined,
      assisted: undefined,
    };
  }

  buildExtraParams = (params: FilterApiParams, apiEventType: ApiEventType) : FilterApiParams => {
    let result: FilterApiParams = {
      access_token: this.authService.getAuthorizationToken(),
    };
    for (const key in params) {
      const paramValue = params[key];
      if (params[key]) {
        result[key] = paramValue;
      }

    }
    if (apiEventType === "event") {
      delete result.assisted;
      delete result.version;
      delete result.personId;
    }
    return result;
  }

  /**
   * Parse data from a table 'agenda' to fullcalencar event object
   * @param data 
   */
  agendaDataTransform = (data): EventInput => {
    const event = new FullCalendarEventFactory(data, ApiEventType.Agenda);
    return event.decode();
  }

  /**
   * Parse data from a table 'evento' to fullcalencar event object
   * @param data 
   */
  eventDataTransform = (data): EventInput => {
    const event = new FullCalendarEventFactory(data, ApiEventType.Event);
    return event.decode();
  }
  
}

interface FilterApiParams {
  access_token?: String;
  therapistId?: String | Number;
  personId?: String | Number;
  version?: String | Number;
  assisted?: Boolean;
}