import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import Calendar from '@fullcalendar/core/Calendar';
import { ListPersonsDialogComponent } from '../records/components/list-persons-dialog/list-persons-dialog.component';
import { MatDialog } from '@angular/material';
import { ModalCalendarEventComponent } from './modal-calendar-event/modal-calendar-event.component';
import { FullcalendarApiService } from 'src/app/shared/services/fullcalendar-api.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, AfterViewChecked, OnDestroy {

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
  calendarApi: Calendar;

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
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
    public dialog: MatDialog,
    private fullcalendarApiService: FullcalendarApiService
  ) {}

  ngOnDestroy(): void {
    this.calendarService.resetFilters();
  }

  ngOnInit() {
    this.initAgendaInstance();
  }

  // Run only when agenda component was instanced instead of accessed by route
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

  ngAfterViewChecked(): void { 
    this.changeRef.detectChanges();
    this.calendarApi = this.calendarComponent.getApi();
    this.fullcalendarApiService.fullcalendarAPI.next(this.calendarComponent.getApi());
  }
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  // Filters
  updateState(value, filterKey) {
    if (filterKey === 'therapist') {
      this.therapistLabel = value ? value.label : '';
    }
    this.calendarService.updateFilters(filterKey, value);
    this.calendarApi.refetchEvents();
  }

  // Fullcalendar Events
  eventLoader(value: any) {
    this.isLoading = value;
  }

  // when date click ocurs it means that user is trying to add a new event
  dateClick(value: any) {
    if (this.permissionService.permissions.value.canAddAgendaAppointment ||
      this.permissionService.permissions.value.canAddAgendaEvent) 
    {
        const dialogRef = this.dialog.open(
          ModalCalendarEventComponent, 
          { 
            width: '900px', 
            height: '600px',
          }
        );
        const props = {
          startDate: value.dateStr,
          endDate: value.dateStr,
        }
        dialogRef.componentInstance.props = props;
        dialogRef.componentInstance.action = 'add'

    }
  }

  navLinkDayClick(value: Date) {
    const date = new Date(value);
    this.calendarApi.changeView("timeGridDay", date);
  }

  eventClick(value: any) {
    console.log("eventClick", value);
  }

  eventRender(value: any) {
    let element: Element = value.el;
    element.querySelectorAll(".fc-content")[0].setAttribute('data-tooltip', value.event.title);
  }

  eventDragStart(value: any) {
    console.log("dragStart", value);
  }
  
  eventDragStop(value: any) {
    console.log("dragStop", value);
  }
  
  select(value: any) {
    if (this.calendarApi.view.type !== "dayGridMonth") {
      console.log("select", value);
    }
  }
}
