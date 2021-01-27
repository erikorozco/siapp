import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
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

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, AfterViewChecked {

  constructor(
    public toastr: ToastrService,
    private changeRef: ChangeDetectorRef,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {}

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  isLoading = false;

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
    eventSources: this.calendarService.eventSources
  };

  // Events
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
    console.log(calendarApi.getEvents());
    calendarApi.refetchEvents();
  }
}
