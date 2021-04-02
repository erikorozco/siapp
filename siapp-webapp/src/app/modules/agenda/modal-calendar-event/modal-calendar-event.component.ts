import { Component, Input, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-modal-calendar-event',
  templateUrl: './modal-calendar-event.component.html',
  styleUrls: ['./modal-calendar-event.component.css']
})
export class ModalCalendarEventComponent implements OnInit {

  formType = 'appointment-form';
  @Input() props: IAppointment;
  @Input() action = 'view';

  constructor(
    private permissionService: PermissionService,
  ) { }

  ngOnInit() {
    this.formType = this.permissionService.permissions.value.canAddAgendaAppointment ? 'appointment-form' : 'event-form'
    
    // Logic to detect which event type is (appointment or event) and which view (view, add, edit, delete)
    // Only the administrative/admin can edit both
    // User can edit/add/delete its events
  }

  render(formType) {
    this.formType = formType;
  }

}

export interface IAppointment  {
  date?: string | Date;
  startDate?: string | Date;
  endDate?: string | Date;
  notes?: string;
  person?: any;
  therapist?: any;
  time?: string;
  duration?: string; // Userd to specify if it is an all_day event
  version?: string;
  assisted?: boolean;
}
