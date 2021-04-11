import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventService, IEventApiDataModel } from 'src/app/shared/services/event.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IEvent } from '../modal-calendar-event/modal-calendar-event.component';
import {
  AGENDA_CONST as AgendaConstants
} from 'src/app/shared/utils/agenda.constants';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { FullcalendarApiService } from 'src/app/shared/services/fullcalendar-api.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {

  @Input() props: IEvent;
  @Input() action = 'view';

  agendaConstants = AgendaConstants;
  eventData = {
      id: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      notes: null,
      therapist: null,
      duration: null,
      isBackground: null
  };
  areDatesInvalid = false;
  isEventFormInvalid = true;

  constructor(
    private toastr: ToastrService,
    private eventService: EventService,
    private permissionService: PermissionService,
    private dateTimeHelper: DateTimeHelper,
    public dialog: MatDialog,
    private fullcalendarApiService: FullcalendarApiService,
    private userDataService: UserDataService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.setEventData(this.props);
    this.updateEventFormInvalidState();
  }

  submit() {
    const data = this.buildEventApiDataModel();
    
    if (this.action === 'add') {
      this.eventService.createEvent(data).subscribe((res) => {
        this.fullcalendarApiService.refetchEvents();
        // TODO: Fix this
        // this.fullcalendarApiService.navigateToView('timeGridWeek', this.dateTimeHelper.parseStringToDate(data.startDate));
        this.toastr.success('El evento ha sido creado exitosamente', 'Operacion exitosa');
        this.dialog.closeAll();
      }, (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    } else if (this.action === 'edit') {
      const eventId = this.eventData.id;
      this.eventService.updateEvent(eventId, data).subscribe((res) => {
        this.fullcalendarApiService.refetchEvents();
        // TODO: Fix this
        // this.fullcalendarApiService.navigateToView('timeGridWeek', this.dateTimeHelper.parseStringToDate(data.startDate));
        this.toastr.success('El evento ha sido actualizado exitosamente', 'Operacion exitosa');
        this.dialog.closeAll();
      }, (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  setEventData(props) {
    for (const key in props) {
      this.eventData[key] = props[key];
    }
    
    // If User cant edit Agendas it means that only has access to add its own events.
    if (!this.permissionService.permissions.value.canEditAgendaAppointment) {
      let user = this.userService.signedUserInfo.value;
      let users = this.userDataService.users.value;
      user = users.find((u: any) => u.therapist.id == user.therapistId);
      this.eventData.therapist = this.userDataService.parseUser(user);
    }
  }

  updateEventDataState(value, key) {
    this.eventData[key] = value;
    this.updateEventFormInvalidState();
  }

  updateEventDateTime(value: IDateTimeInfo, key: string) {

    this.updateEventDataState(value.time, key);

    if (this.eventData.startTime && this.eventData.endTime) {
      const startDate = this.dateTimeHelper.buildDateTimeForUI(this.eventData.startDate, this.eventData.startTime);
      const endDate = this.dateTimeHelper.buildDateTimeForUI(this.eventData.endDate, this.eventData.endTime);

      const areDatesValid = this.dateTimeHelper.isDateGreaterThan(endDate, startDate);

      if (!areDatesValid) {
        this.areDatesInvalid = true;
      } else {
        this.areDatesInvalid = false;
      }
    }
    this.updateEventFormInvalidState();
  }

  updateEventFormInvalidState(): void {
    if (this.areDatesInvalid || !this.eventData.therapist) {
      this.isEventFormInvalid = true;
    } else {
      this.isEventFormInvalid = false;
    }
  }

  buildEventApiDataModel(): IEventApiDataModel {
    const {
      id,
      startDate,
      endDate,
      startTime,
      endTime,
      notes,
      therapist,
      duration,
      isBackground
    } = this.eventData;
    return {
      id,
      startDate: this.dateTimeHelper.buildDateTimeForUI(startDate, startTime),
      endDate: this.dateTimeHelper.buildDateTimeForUI(endDate, endTime),
      notes,
      therapist: {
        id: therapist.therapist.id
      },
      duration: duration ? 'allDay' : null,
      isBackground
    }
  }

  allDayEventHandler() {
    this.eventData.duration = !this.eventData.duration;
    if (this.eventData.duration) {
      this.eventData.startTime = 800;
      this.eventData.endTime = 2000;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(
      ConfirmModalComponent, 
      { 
        width: '400px', 
        height: '350px',
        data: {
          title: "Confirmación",
          body: `¿Estás seguro de borrar este evento?`,
          note: 'Esta acción no podrá ser revertida'
        }
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const eventId = this.eventData.id;
        this.eventService.deleteEvent(eventId).toPromise().then((res) => {
          this.toastr.success('El evento ha sido eliminado exitosamente', 'Operacion exitosa');
          this.fullcalendarApiService.refetchEvents();
          this.dialog.closeAll();
          // TODO: Fix this
          //  this.fullcalendarApiService.navigateToView('timeGridWeek', this.dateTimeHelper.parseStringToDate(this.appointmentData.startDate));
        }, error => {
          this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
        });
      }
    });
  }

}

interface IDateTimeInfo {
  date: string;
  time: number;
}
