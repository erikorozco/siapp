import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import {
  AGENDA_CONST as AgendaConstants
} from 'src/app/shared/utils/agenda.constants';
import { PersonDataService } from 'src/app/shared/services/data/person-data.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, AfterViewChecked {

    //This variables are used when component is called inside other component and url data does no exist
  // i = instance
  @Input() iTherapistId;
  @Input() iPersonId;
  @Input() iAction = 'view-agenda';
  @Input() isChild = false;

  therapistLabel = '';
  therapistId;
  personId;
  action;

  isLoading = false;
  isFilterHidden = true;
  agendaConstants = AgendaConstants;

  // Calendar Setttings
  fullCallendarSettings = {
    dragScroll: true,
    droppable: true,
    editable: true,
    selectable: true,
    nowIndicator: true,
    navLinks: true,
    lazyFetching: true,
    defaultView: 'dayGridMonth',
    slotDuration: '00:15:00',
    minTime: '08:00:00',
    maxTime: '20:00:00',
    defaultTimedEventDuration: '00:30',
    locale: 'es',
    themeSystem: 'bootstrap',
    eventLimit: 4,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    customButtons: {
      myCustomButton: {
        text: 'API!',
        click: () => {
          this.executeAPI();
        }
      }
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek myCustomButton'
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    plugins: [
      timeGridPlugin, 
      dayGridPlugin,
      listGridPlugin,
      interactionPlugin,
      bootstrapPlugin
    ],
    locales: [esLocale],
    eventSources: this.calendarService.eventSources,
  };

  constructor(
    public toastr: ToastrService,
    private routes: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    private calendarService: CalendarService,
    private userDataService: UserDataService,
    private permissionService: PermissionService,
  ) {}

  ngOnInit() {
    this.initAgendaInstance();
  }

  // Run only we agenda component was instanced instead of accessed by route
  initAgendaInstance() {
    if(this.isChild) {
      this.therapistId = this.iTherapistId;
      this.personId = this.iPersonId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });
      this.routes.params.subscribe(params => {
        if (params) {
          this.therapistId = params.therapistId;
          this.personId = params.personId;
        }
      });
    }

    // Update state
    if (this.therapistId) {
      const filterValue = {
        therapist: {
          id: this.therapistId
        }
      };
      this.calendarService.updateFilters('therapist', filterValue);
    } 

    if (this.personId) {
      const filterValue = {
        id: this.personId
      };
      this.calendarService.updateFilters('person', filterValue);
    }
  }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  // Filters
  updateState(value, filterKey) {
    if (filterKey === 'therapist') {
      this.therapistLabel = value ? value.label : '';
    }
    this.calendarService.updateFilters(filterKey, value);
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.refetchEvents();
  }

  // Fullcalendar Events
  eventLoader(value: any) {
    this.isLoading = value;
    console.log("loading", value);
  }

  dateClick(value: any) {
    console.log("dateClick", value);
  }

  navLinkDayClick(value: Date) {
    console.log("navlinkdayClick",value);
  }

  eventMouseEnter(value: any) {
    console.log("eventMouseEnter", value);
  }

  eventClick(value: any) {
    console.log("eventClick", value);
  }

  eventRender(value: any) {
    let element: Element = value.el;
    console.log("eventRender", value);
    element.querySelectorAll(".fc-content")[0].setAttribute('data-tooltip', value.event.title);
  }

  eventDragStart(value: any) {
    console.log("dragStart", value);
  }

  eventDragStop(value: any) {
    console.log("dragStop", value);
  }

  executeAPI () {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.refetchEvents();
  }
}
