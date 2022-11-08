import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ServiceTypeDataService } from 'src/app/shared/services/data/service-type-data.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { OtherTicketService } from 'src/app/shared/services/other-ticket.service';
import {
  TICKET_CONST as TicketConstants
} from 'src/app/shared/utils/ticket.constants';

@Component({
  selector: 'app-form-other-ticket',
  templateUrl: './form-other-ticket.component.html',
  styleUrls: ['./form-other-ticket.component.css']
})
export class FormOtherTicketComponent implements OnInit {
  ticketConstants = TicketConstants;
  otherTicketId;
  isDisabled = false;
  action = 'view-ticket';
  otherTicketForm: FormGroup;
  ticketPersonDataFromGroup = new FormGroup({});
  otherTicket: any;
  record;
  therapists = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    public dialog: MatDialog,
    public userDataService: UserDataService,
    public serviceTypeDataService: ServiceTypeDataService,
    public otherTicketService: OtherTicketService,
  ) { }

  async ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();
    if (this.action === 'view-other-ticket') {
      this.otherTicketService.get(this.otherTicketId).toPromise().then(data => {
        this.otherTicket = data;
        this.setFormData(data);
        this.otherTicketForm.disable();
    }, error => {console.log(error); });
    } else if (this.action === 'duplicate-other-ticket' || this.action === 'edit-other-ticket') {
      this.otherTicketService.get(this.otherTicketId).toPromise().then(data => {
        this.setFormData(data);
        this.otherTicket = data;
        if (this.otherTicket.status === 'CANCELADO') {
          this.otherTicketForm.disable();
          this.isDisabled = true;
        }
        this.ticketPersonDataFromGroup.markAsDirty();
      }, error => { console.log(error); });
    } else if (this.action === 'add-other-ticket') {
      this.record = {
        id: null,
        person: {
          name: null,
          lastName: null,
          secondLastName: null,
        },
        bornDate: null,
        parish: null,
        gender: '',
        city: null,
        location: null,
      };
    }
  }

  initFormProperties() {
    this.routes.url.subscribe(url => {
      this.action = url[0].path;
    });
    this.routes.params.subscribe(params => {
      this.otherTicketId = params.id;
    });
  }

  setFormData(data) {
    if (this.action === 'duplicate-other-ticket') {
        data.id = null;  
        data.serviceType = {
          id: "",
          label:  "",
          value:  "",
          active:  "",
          createdAt:  "",
          updatedAt:  "",
        };
        data.concept = null;   
    }
    this.otherTicketForm.setValue(data);
    const {
      name,
      lastName,
      secondLastName,
      bornDate,
      parish,
      gender,
      location,
      city,
      therapists,
    } = this.otherTicketForm.value;
    this.record
    this.record = {
      id: null,
      person: {
        name,
        lastName,
        secondLastName,
      },
      bornDate,
      parish,
      gender,
      city,
      location,
    };

    this.therapists = therapists.map((t) => {
      return this.userDataService.parseTherapist(t);
    });
  }

  addTherapist(therapist) {
    if (therapist) {
      const targetIndex = this.therapists.findIndex((t) => t.therapist.id === therapist.therapist.id);
      if (targetIndex < 0) {
        this.therapists.push(therapist);
        this.ticketPersonDataFromGroup.markAsDirty();
        this.otherTicketForm.markAsDirty();
      }
    }
  }

  deleteTherapist(therapist) {
    const targetIndex = this.therapists.findIndex((t) => t.therapist.id === therapist.therapist.id);
    if (targetIndex >= 0) {
      this.therapists.splice(targetIndex, 1);
      this.ticketPersonDataFromGroup.markAsDirty();
      this.otherTicketForm.markAsDirty();
    }
  }

  handleFormTicketPersonData(formGrop) {
    this.ticketPersonDataFromGroup = formGrop;
    this.otherTicketForm.markAsDirty();
  }

  onSubmit() {
    if (this.action === 'duplicate-other-ticket' || this.action === 'add-other-ticket') {
      this.setFormTicketPersonDataToFormTicket();
      this.otherTicketForm.get('therapists').setValue(this.parseTherapistaApiFormData());
      this.otherTicketService.create(this.otherTicketForm.value).toPromise().then((data: any) => {
        this.toastr.success('El recibo ha sido creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'tickets']);
        let newRelativeUrl = this.router.createUrlTree(['print-ticket', data.id], { queryParams: { type: 'other' } });
        let baseUrl = window.location.href.replace(this.router.url, '');
        window.open(baseUrl + newRelativeUrl, '_blank');
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.setFormTicketPersonDataToFormTicket();
      this.otherTicketForm.get('therapists').setValue(this.parseTherapistaApiFormData());;
      this.otherTicketService.update(this.otherTicketId, this.otherTicketForm.value).toPromise().then(data => {
        this.toastr.success('El recibo ha sido actualizado exitosamente', 'Operacion exitosa');
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
            this.router.navigate(['home', 'edit-other-ticket', this.otherTicketId])
          );
        // this.router.navigate(['home', 'tickets']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  setFormTicketPersonDataToFormTicket() {
    if (this.ticketPersonDataFromGroup.touched) {
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
      this.otherTicketForm.get('name').setValue(name);
      this.otherTicketForm.get('lastName').setValue(lastName);
      this.otherTicketForm.get('secondLastName').setValue(secondLastName);
      this.otherTicketForm.get('bornDate').setValue(bornDate);
      this.otherTicketForm.get('parish').setValue(parish);
      this.otherTicketForm.get('gender').setValue(gender);
      this.otherTicketForm.get('location').setValue(location);
      this.otherTicketForm.get('city').setValue(city);
    }
  }

  parseTherapistaApiFormData() {
    return this.therapists.map((t) => {
      return {
        id: t.therapist.id
      }
    });
  }

  cancelTicket() {
    const dialogRef = this.dialog.open(
      ConfirmModalComponent, 
      { 
        width: '400px', 
        height: '350px',
        data: {
          title: "Confirmación",
          body: `¿Estás seguro de cancelar este recibo? [${this.otherTicketId}]`,
          note: 'Esta acción no podrá ser revertida'
        }
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.otherTicketForm.get(['status']).setValue('CANCELADO');
        this.otherTicketService.update(this.otherTicketId, this.otherTicketForm.value).toPromise().then((res) => {
          this.otherTicket = res;
          this.toastr.success('El recibo ha sido cancelado exitosamente', 'Operacion exitosa');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
            this.router.navigate(['home', 'view-other-ticket', this.otherTicketId])
          );
        }, error => {
          this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
        });
      }
    });
  }

  formValidatorBuilder(): void {
    this.otherTicketForm = this.formBuilder.group({
      id: ['', ],
      concept: ['', ],
      status: ['NORMAL', ],
      total: ['',  Validators.compose([Validators.required]) ],
      name: ['', ],
      lastName: ['', ],
      secondLastName: ['', ],
      bornDate: ['', ],
      parish: ['', ],
      gender: ['', ],
      location: ['', ],
      city: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      serviceType: this.formBuilder.group({
        id: ['', Validators.compose([Validators.required])],
        label: ['', ],
        value: ['', ],
        active: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ],
      }),
      therapists: ['', ],
    });
  }

  requiredFieldValidation(field) {
    return this.otherTicketForm.get(field).invalid && this.otherTicketForm.get(field).touched;
  }
}
