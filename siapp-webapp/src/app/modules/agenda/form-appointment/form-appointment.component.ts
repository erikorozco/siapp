import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { AgendaService, IAppointmentApiDataModel } from 'src/app/shared/services/agenda.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { FullcalendarApiService } from 'src/app/shared/services/fullcalendar-api.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import {
  AGENDA_CONST as AgendaConstants
} from 'src/app/shared/utils/agenda.constants';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
import { ListPersonsDialogComponent } from '../../records/components/list-persons-dialog/list-persons-dialog.component';
import { IAppointment } from '../modal-calendar-event/modal-calendar-event.component';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css']
})
export class FormAppointmentComponent implements OnInit {

  @Input() props: IAppointment;
  @Input() action = 'add';

  @Output() eventReload = new EventEmitter();

  appointmentForm: FormGroup;
  agendaConstants = AgendaConstants;
  appointmentData = {
      date: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      notes: null,
      person: null,
      therapist: null,
      time: null,
      duration: null,
      version: null,
      assisted: false
  };
  areDatesInvalid = true;
  isAppointmentFormInvalid = true;

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private agendaService: AgendaService,
    private permissionService: PermissionService,
    private userDataService: UserDataService,
    private dateTimeHelper: DateTimeHelper,
    private fullcalendarApiService: FullcalendarApiService
  ) {
  }

  ngOnInit() {
    this.setAppointmentData(this.props);
  }

  submit() {
    const data = this.buildAppointmentApiDataModel();
    if (this.action === 'add') {
      this.agendaService.createAgenda(data).subscribe((res) => {
        this.toastr.success('La cita ha sido creada exitosamente', 'Operacion exitosa');
        this.dialog.closeAll();
        this.fullcalendarApiService.refetchEvents();
      }, (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {

    }
  }

  openPersonsModal() {
    const dialogRef = this.dialog.open(
      ListPersonsDialogComponent, 
      { 
        width: '1080px', 
        height: '720px',
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateAppointmentDataState(res, 'person');
      }
    });
  }

  setAppointmentData(props) {
    for (const key in props) {
      this.appointmentData[key] = props[key];
    }
  }

  updateAppointmentDataState(value, key) {
    this.appointmentData[key] = value;
    this.updateAppointmentFormInvalidState();
  }

  updateAppointmentDateTime(value: IDateTimeInfo, key: string) {

    this.updateAppointmentDataState(value.time, key);

    if (this.appointmentData.startTime && this.appointmentData.endTime) {
      const startDate = this.dateTimeHelper.buildDateTimeForUI(this.appointmentData.startDate, this.appointmentData.startTime);
      const endDate = this.dateTimeHelper.buildDateTimeForUI(this.appointmentData.endDate, this.appointmentData.endTime);

      const areDatesValid = this.dateTimeHelper.isDateGreaterThan(endDate, startDate);

      if (!areDatesValid) {
        this.areDatesInvalid = true;
      } else {
        this.areDatesInvalid = false;
      }
    }
    this.updateAppointmentFormInvalidState();
  }

  updateAppointmentFormInvalidState(): void {
    if (this.areDatesInvalid || !this.appointmentData.person || !this.appointmentData.therapist) {
      this.isAppointmentFormInvalid = true;
    } else {
      this.isAppointmentFormInvalid = false;
    }
  }

  buildAppointmentApiDataModel(): IAppointmentApiDataModel {
    const {
      startDate,
      endDate,
      startTime,
      endTime,
      notes,
      person,
      therapist,
      time,
      duration,
      assisted,
    } = this.appointmentData;
    return {
      date: this.appointmentData.startDate,
      startDate: this.dateTimeHelper.buildDateTimeForUI(startDate, startTime),
      endDate: this.dateTimeHelper.buildDateTimeForUI(endDate, endTime),
      notes,
      person: {
        id: person.id
      },
      therapist: {
        id: therapist.therapist.id
      },
      time: this.action === 'add'? '12:00AM' : time, // 12:00AM IS ONLY TO AVOID ERROS WITH THE OLD SYSTEM
      duration,
      version: '2',
      assisted
    }
  }


}
interface IDateTimeInfo {
  date: string;
  time: number;
}
