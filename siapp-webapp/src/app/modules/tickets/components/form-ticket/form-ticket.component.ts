import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ServiceTypeDataService } from 'src/app/shared/services/data/service-type-data.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { RecordService } from 'src/app/shared/services/record-service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
import {
  TICKET_CONST as TicketConstants
} from 'src/app/shared/utils/ticket.constants';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css']
})
export class FormTicketComponent implements OnInit {
  ticketConstants = TicketConstants;
  ticketId;
  isDisabled = false;
  action = 'view-ticket';
  ticketForm: FormGroup;
  ticketPersonDataFromGroup: FormGroup;
  ticket: any;
  record: any;
  therapist: any;
  derivations: any = [];
  editRecordData = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private ticketService: TicketService,
    private recordService: RecordService,
    private derivationService: DerivationService,
    public dateTimeHelper: DateTimeHelper,
    public dialog: MatDialog,
    public userDataService: UserDataService,
    public serviceTypeDataService: ServiceTypeDataService,
  ) { }

  async ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-ticket') {
      this.ticketService.getTicket(this.ticketId).toPromise().then(data => {
        this.setTicketFormData(data);
        this.ticketForm.disable();
    }, error => {console.log(error); });

    } else if (this.action === 'edit-ticket') {
      this.ticketService.getTicket(this.ticketId).toPromise().then(data => {
        this.setTicketFormData(data);
        if (this.ticket.status === 'CANCELADO') {
          this.ticketForm.disable();
          this.isDisabled = true;
        }
      }, error => { console.log(error); });
    }
  }

  initFormProperties() {
    this.routes.url.subscribe(url => {
      this.action = url[0].path;
    });
    this.routes.params.subscribe(params => {
      this.ticketId = params.id;
    });
  }

  setTicketFormData(data) {
    const {therapist, record} = data;
    this.record = record;
    this.therapist = this.userDataService.parseTherapist(therapist);
    delete data.record;
    delete data.therapist;

    data = {
      ...data,
      record: {
        id: record.id,
      },
      therapist: {
        id: therapist.id
      }
    }
    this.ticket = data;
    this.ticketForm.setValue(this.ticket);
  }

  async updateFormState(value, key) {
    this.ticketForm.markAsDirty();
    if (key === 'record') {
      await this.setRecord(value);
      value = this.record ? this.record.id : null;
      const formControl = this.ticketForm.get(['record', 'id']);
      formControl.setValue(value);
      formControl.markAsTouched();
    } else if (key === 'therapist') {
      value = value ? value.therapist.id : null;
      const formControl = this.ticketForm.get(['therapist', 'id']);
      formControl.setValue(value);
      formControl.markAsTouched();
    }

  }

  cancelTicket() {
    const dialogRef = this.dialog.open(
      ConfirmModalComponent, 
      { 
        width: '400px', 
        height: '350px',
        data: {
          title: "Confirmación",
          body: `¿Estás seguro de cancelar este recibo? [${this.ticketId}]`,
          note: 'Esta acción no podrá ser revertida'
        }
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.ticketForm.get(['status']).setValue('CANCELADO');
        this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).toPromise().then((res) => {
          this.toastr.success('El recibo ha sido cancelado exitosamente', 'Operacion exitosa');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
            this.router.navigate(['home', 'view-ticket', this.ticketId])
          );
        }, error => {
          this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
        });
      }
    });
  }

  async setRecord(recordId) {
    try {
      recordId = Number(recordId);
      if (!isNaN(recordId)) {
        if (recordId == 0) {
          this.record = null;
        } else {
          this.record = await this.recordService.getRecordById(recordId).toPromise();

          if (this.record.version == 2) {
            this.derivations = await this.derivationService.getDerivationByRecordId(recordId).toPromise();
          }
        }
      }
    } catch (error) {
      this.record = null;
      this.toastr.warning('No se encontró el expediente especificado', 'Expediente no encontrado');;
    }
  }

  handleFormTicketPersonData(ticketPersonDataFromGroup: FormGroup) {
    this.ticketPersonDataFromGroup = ticketPersonDataFromGroup;
    if (this.ticketPersonDataFromGroup.valid) {
      const {
        name,
        lastName,
        secondLastName,
        bornDate,
        parish,
        gender,
        location,
        city
      } = this.ticketPersonDataFromGroup.value;
      this.record.person.name = name;
      this.record.person.lastName = lastName;
      this.record.person.secondLastName = secondLastName;
      this.record.bornDate = bornDate;
      this.record.parish = parish;
      this.record.gender = gender;
      this.record.location = location;
      this.record.city = city;
    }
  }

  saveFormTicketPersonData() {
    // Avoid use new Date();
    this.record.bornDate = this.dateTimeHelper.parseStringToDate(this.record.bornDate);
    this.recordService.updateRecord(this.record.id, this.record).subscribe((res) => {
      this.toastr.success('La información del paciente ha sido actualizada exitosamente', 'Operacion exitosa');
      this.editRecordData = false;
    }, () => {
      this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
    });
  }

  onSubmit() {
    if (this.action === 'add-ticket') {
      this.ticketService.createTicket(this.ticketForm.value).toPromise().then((data: any) => {
        this.toastr.success('El recibo ha sido creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'tickets']);
        let newRelativeUrl = this.router.createUrlTree(['print-ticket', data.id]);
        let baseUrl = window.location.href.replace(this.router.url, '');
        window.open(baseUrl + newRelativeUrl, '_blank');
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).toPromise().then(data => {
        this.toastr.success('El recibo ha sido actualizado exitosamente', 'Operacion exitosa');
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
            this.router.navigate(['home', 'edit-ticket', this.ticketId])
          );
        // this.router.navigate(['home', 'tickets']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.ticketForm = this.formBuilder.group({
      id: ['', ],
      concept: ['', ],
      status: ['NORMAL', ],
      total: ['',  Validators.compose([Validators.required])],
      createdAt: ['', ],
      updatedAt: ['', ],
      record: this.formBuilder.group({
        id: ['',  Validators.compose([Validators.required])],
      }),
      therapist: this.formBuilder.group({
        id: ['',  Validators.compose([Validators.required])],
      }),
      serviceType: this.formBuilder.group({
        id: ['', Validators.compose([Validators.required])],
        label: ['', ],
        value: ['', ],
        active: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ],
      })
    });
  }

  requiredFieldValidation(field) {
    return this.ticketForm.get(field).invalid && this.ticketForm.get(field).touched;
  }

}
