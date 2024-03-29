import { isEqual } from 'lodash';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { FilterApiParams, FulcallendarFiltersFactory } from '../factories/FulcallendarFiltersFactory';
import { FullCalendarEventFactory, ApiEventType } from '../factories/FullCalendarEventFactory';
import { DateTimeHelper } from '../utils/DateTimeHelper';
import { AgendaService } from './agenda.service';
import { AuthService } from './auth.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  eventSources ={
    agendas: null,
    events: null
  }
  filters = this.getInitialFiltersState();

  constructor(
    private dateTimeHelper: DateTimeHelper,
    private authService: AuthService,
    private agendaService: AgendaService,
    private eventService: EventService,
    public toastr: ToastrService
  )
  {
    this.eventSources = {
      agendas: {
        url: this.agendaService.agendasFilterUrl,
        method: 'GET',
        extraParams: () => {
          return this.buildExtraParams(ApiEventType.Agenda)
        },
        failure: () => {
          this.toastr.error('Ocurrio un error obteniendo las citas.', 'Operacion invalida');
        },
        eventDataTransform: this.agendaDataTransform
      },
      events: {
        url: this.eventService.eventsFilterUrl,
        method: 'GET',
        extraParams: () => {
          return this.buildExtraParams(ApiEventType.Event)
        },
        failure: () => {
          this.toastr.error('Ocurrio un error obteniendo los eventos.', 'Operacion invalida');
        },
        eventDataTransform: this.eventDataTransform
      }
    };
  }

  /**
   * Return the desired sources that feeds the full calendar Agendas AND/OR Events
   * 
   * @returns Array
   * @memberof CalendarService
   */
  getFullCalendarEventSources(agendas = true, events = true): Array<any> {
    const eventSources = [];
     
    if (agendas) {
        eventSources.push(this.eventSources.agendas);
    }

    if (events) {
        eventSources.push(this.eventSources.events);
    }

    return eventSources;
  }

  getInitialFiltersState(): FiltersType {
    return {
      therapist: undefined,
      person: undefined,
      version: undefined,
      assisted: undefined,
      notes: undefined,
    };
  }

  buildExtraParams = (apiEventType: ApiEventType) : FilterApiParams => {
    const fullcalendarFilterParams = new FulcallendarFiltersFactory(this.filters, apiEventType, this.authService.getAuthorizationToken());
    const serilizedFilter = fullcalendarFilterParams.decode();
    let params = {};
    Object.keys(serilizedFilter).map((key) => {
      const paramValue = serilizedFilter[key]
      if (paramValue) {
        params[key] = paramValue;
      }
    });
    return params;
  }

  updateFilters(key: string, newValue: any) {
    const curr = this.filters[key];
    if (!isEqual(curr, newValue)) {
      let newFilters = {
        ...this.filters,
        [key]: newValue,
      };
      this.filters = newFilters;
    }
  }

  resetFilters () {
    for (const key in this.filters) {
      this.filters[key] = undefined;
    }
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

type FiltersType = {
  therapist?: any;
  person?: any;
  version?: any;
  assisted?: any;
  notes?: any;
}