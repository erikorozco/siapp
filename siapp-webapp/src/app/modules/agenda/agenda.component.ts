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
import { MatDialog } from '@angular/material';
import { IAppointment, IEvent, ModalCalendarEventComponent } from './modal-calendar-event/modal-calendar-event.component';
import { FullcalendarApiService } from 'src/app/shared/services/fullcalendar-api.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
declare var $:any;

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
  @Input() renderEvents = true;
  @Input() renderAgendas = true;

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
    editable: false, // Enable to set drag and drop and extend or reduce event
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
    eventSources: [],
  };

  constructor(
    public toastr: ToastrService,
    private routes: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    private calendarService: CalendarService,
    private userDataService: UserDataService,
    private permissionService: PermissionService,
    public dialog: MatDialog,
    private fullcalendarApiService: FullcalendarApiService,
    private dateTimeHelper: DateTimeHelper,
  ) {}

  ngOnDestroy(): void {
    this.calendarService.resetFilters();
  }

  ngOnInit() {
    this.initFullCalendarEventSources();
    this.initAgendaInstance();
  }

  initFullCalendarEventSources() {
    this.fullCallendarSettings.eventSources = this.calendarService.getFullCalendarEventSources(this.renderAgendas, this.renderEvents);
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
    if (value.view.type === 'dayGridMonth') {
      this.openModal(value, 'add');
    }
  }

  // when select ocurs it means that user is trying to add a new event
  select(value: any) {
    if (this.calendarApi.view.type !== "dayGridMonth") {
      this.openModal(value, 'add');
    }
  }

  navLinkDayClick(value: Date) {
    const date = new Date(value);
    this.calendarApi.changeView("timeGridDay", date);
  }

   // when eventClick ocurs it means that user is trying to edit an existing event
  eventClick(value: any) {
    this.openModal(value, 'edit');
  }

  eventRender(value: any) {
    $(value.el).tooltip({
      title: value.event.title,
      placement: "top",
      trigger: "hover",
      container: "body"
    });
  }

  /**
   * Only available if editable is set to true
   * NO BEING USED
   * @param {*} value
   * @memberof AgendaComponent
   */
  eventDragStart(value: any) {
    console.log("dragStart", value);
  }
  
  /**
   * Only available if editable is set to true
   * NO BEING USED
   * @param {*} value
   * @memberof AgendaComponent
   */
  eventDragStop(value: any) {
    console.log("dragStop", value);
  }

  /**
   * Modal Handler
   * @param eventData 
   */
  openModal(eventData, action) {
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

        if (action === 'add') {
          dialogRef.componentInstance.props = this.buildCalendarEventProps(eventData);
        } else {
          dialogRef.componentInstance.props = this.buildCalendarEventProps(eventData, true);
          // Detect which event type is being edited
          dialogRef.componentInstance.eventType = eventData.event.extendedProps.type === 'agenda' ? 'appointment-form' : 'event-form';
        }
        dialogRef.componentInstance.action = action;

    }
  }

  /****************************************************************************
   * PRIVATE FUNCTIONS                                                        *
   ****************************************************************************/

  /**
   * Build the props that ModalCalendarEventComponent receives
   * based on the mode ADD - EDIT
   *
   * @private
   * @param {*} value
   * @param {boolean} [isEdit=false]
   * @returns {(IAppointment | IEvent)}
   * @memberof AgendaComponent
   */
  private buildCalendarEventProps(value: any, isEdit = false): IAppointment | IEvent {
    let props = {
        id: null,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        notes: null,
        therapist: this.calendarService.filters.therapist,
        duration: null,
        date: null,
        person: null,
        time: null,
        version: null,
        assisted: null,
        isBackground: null,
        type: null,
    };

    if (isEdit) {
      // Event metadata comming from API
      const extendedProps = value.event.extendedProps;
      props.id = extendedProps.id;

      props.startDate = this.dateTimeHelper.parseStringDateToStringMXDate(extendedProps.startDate);
      props.endDate = this.dateTimeHelper.parseStringDateToStringMXDate(extendedProps.endDate);

      const startDate = this.dateTimeHelper.parseStringToDate(extendedProps.startDate);
      const endDate = this.dateTimeHelper.parseStringToDate(extendedProps.endDate);
      props.startTime = this.dateTimeHelper.buildTimeForUI(startDate);
      props.endTime = this.dateTimeHelper.buildTimeForUI(endDate);

      // Parse therapist info to match typeahead required properties
      props.therapist = this.userDataService.parseTherapist(extendedProps.therapist);
      props.notes = extendedProps.notes;
      props.duration = extendedProps.duration === 'allDay' ? true : false;

      if (extendedProps.type === 'agenda') {
        props.person = extendedProps.person;
        props.assisted = extendedProps.assisted;
      } else {
        props.isBackground = extendedProps.isBackground;
        props.type = extendedProps.type;
      }

    } else {
      props.startDate = this.getStartDate(value);
      props.endDate = this.getEndDate(value);
      props.startTime = this.getStartTime(value);
      props.endTime = this.getEndTime(value);
    }
    return props;
  }

  /**
   * Get start date based on view type
   * NOTE: This is only for ADD mode
   *
   * @private
   * @param {*} eventData
   * @returns {string}
   * @memberof AgendaComponent
   */
  private getStartDate(eventData: any): string {
    const viewType = eventData.view.type;
    let result = '';
    switch(viewType) {
      case 'dayGridMonth':
        result = eventData.dateStr;
        break;
      case 'timeGridWeek':
      case 'timeGridDay':
        result = this.dateTimeHelper.parseStringDateToStringMXDate(eventData.startStr);
        break;
      default:
        result = this.dateTimeHelper.getTodayDateString();
    }
    return result;
  }

  /**
   * Get end date based on view type
   * NOTE: This is only for ADD mode
   *
   * @private
   * @param {*} eventData
   * @returns {string}
   * @memberof AgendaComponent
   */
  private getEndDate(eventData: any): string {
    const viewType = eventData.view.type;
    let result = '';
    switch(viewType) {
      case 'dayGridMonth':
        result = eventData.dateStr;
        break;
      case 'timeGridWeek':
      case 'timeGridDay':
        result = this.dateTimeHelper.parseStringDateToStringMXDate(eventData.endStr);
        break;
      default:
        result = this.dateTimeHelper.getTodayDateString();
    }
    return result;
  }

  /**
   * Get start time based on view type
   * NOTE: This is only for ADD mode
   *
   * @private
   * @param {*} eventData
   * @returns {string}
   * @memberof AgendaComponent
   */
  private getStartTime(eventData: any): number | null {
    const viewType = eventData.view.type;
    let result = null;
    switch(viewType) {
      case 'timeGridWeek':
      case 'timeGridDay':
         // 'start' info only exists on week and day view, otherwise just send the date that comes on month view
        result = this.dateTimeHelper.buildTimeForUI(eventData.start ? eventData.start : eventData.date);
        break;
    }
    return result;
  }

  /**
   * Get end time based on view type
   * NOTE: This is only for ADD mode
   *
   * @private
   * @param {*} eventData
   * @returns {string}
   * @memberof AgendaComponent
   */
  private getEndTime(eventData: any): number | null {
    const viewType = eventData.view.type;
    let result = null;
    switch(viewType) {
      case 'timeGridWeek':
      case 'timeGridDay':
        // 'end' info only exists on week and day view, otherwise just send the date that comes on month view
        result = this.dateTimeHelper.buildTimeForUI(eventData.end ? eventData.end : eventData.date);
        break;
    }
    return result;
  }

}
