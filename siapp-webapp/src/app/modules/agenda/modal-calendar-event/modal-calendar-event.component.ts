import { Component, Input, OnInit } from '@angular/core';
import { IEventType } from 'src/app/shared/factories/FullCalendarEventFactory';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-modal-calendar-event',
  templateUrl: './modal-calendar-event.component.html',
  styleUrls: ['./modal-calendar-event.component.css']
})
export class ModalCalendarEventComponent implements OnInit {

  @Input() props: IAppointment;
  @Input() action = 'view';
  @Input() eventType;

  constructor(
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    if (this.action === 'add') {
      this.eventType = this.permissionService.permissions.value.canAddAgendaAppointment ?  'appointment-form' : 'event-form';
    } else {
      // If editing, detect which event type is being edited
      if (this.eventType === 'appointment-form') {
        this.action = this.permissionService.permissions.value.canEditAgendaAppointment ? 'edit' : 'view';
      } else {
        this.action = this.permissionService.permissions.value.canEditAgendaEvent ? 'edit' : 'view';
      }
    }
  }

  render(eventType) {
    this.eventType = eventType;
  }

}

export interface IAppointment extends IBaseEventAppointmentData {
  date?: string;  // Used to match old system and filtering
  person?: any;
  time?: string;
  version?: string;
};

export interface IEvent extends IBaseEventAppointmentData {
  isBackground?: boolean;
  type: IEventType
};

export interface IBaseEventAppointmentData {
  id?: string;
  startDate: string;
  endDate: string;
  startTime: number;
  endTime: number;
  notes?: number;
  therapist?: any;
  duration?: string; // Used to specify if it is an all_day event.
  assisted: boolean;
};
