import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../../../../shared/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SESSION_FORM_CONST as SessionFormOptions } from 'src/app/shared/utils/session-form.constants';
import { PersonService } from '../../../../shared/services/person.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.css']
})
export class FormSessionComponent implements OnInit {

  personId;
  therapistId;
  sessionForm: FormGroup;
  session: any;
  record: any;
  person: any;
  sessionFormOptions = SessionFormOptions;
  formProperties: any = {
    action: '',
    params: {}
  };

  isOpeningSensitive = new FormControl(false, );
  isDevelopmentSensitive = new FormControl(false, );
  isAgreementsSensitive = new FormControl(false, );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();

    this.routes.url.subscribe(url => {
      this.formProperties.action = url[0].path;
    });

    this.routes.params.subscribe(params => {
      this.formProperties.params = params;
    });

    this.getPersonInformation();
    this.getTherapistInformation();


    if (this.formProperties.action === 'view-session') {
      this.sessionService.getSession(this.formProperties.params.id).subscribe(data => {
        this.session = this.checkSensitiveData(data);
        console.log(this.session)
        this.sessionForm.setValue(data);
      }, error => {console.log(error); });
      this.sessionForm.disable();

    } else if (this.formProperties.action === 'edit-session') {
      this.sessionService.getSession(this.formProperties.params.id).subscribe(data => {
        this.session = this.checkSensitiveData(data);
        this.sessionForm.setValue(this.session);
      }, error => { console.log(error); });

    }

  }

  onSubmit() {
    if (this.formProperties.action === 'add-session') {
      this.session = this.sessionForm.value;
      this.session.active = true;
      this.session.recordId = this.formProperties.params.recordId;
      this.sessionService.createSession(this.sessionForm.value).subscribe(data => {
        this.toastr.success('El reporte clínico ha sido creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.formProperties.params.personId]);
      }, error => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.sessionService.updateSession(this.formProperties.params.id, this.sessionForm.value).subscribe(data => {
        this.toastr.success('El reporte clínico ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.formProperties.params.personId]);
      }, error => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  getPersonInformation() {
    this.personService.getPerson(this.formProperties.params.personId).subscribe(data => {
      this.person = data;
    }, error => {
      console.log(error);
    });
  }

  getTherapistInformation() {
    this.userService.getTokenDetails().subscribe((data) => {
      this.therapistId = data.therapistId;
    })
  }

  requiredFieldValidation(field) {
    return this.sessionForm.get(field).invalid && this.sessionForm.get(field).touched;
  }

  formValidatorBuilder(): void {
    this.sessionForm = this.formBuilder.group({
      id: ['', ],
      sessionType: ['', Validators.compose([Validators.required])],
      psychologicalOpening: ['', Validators.compose([Validators.required])],
      psychologicalAdvance: ['', Validators.compose([Validators.required])],
      psychologicalDevelopment: ['', Validators.compose([Validators.required])],
      psychologicalAgreements: ['', Validators.compose([Validators.required])],
      openingSensitiveData: [false, Validators.compose([Validators.required])],
      developmentSensitiveData: [false, Validators.compose([Validators.required])],
      agreementsSensitiveData: [false, Validators.compose([Validators.required])],
      active: ['', ],
      sessionNumber: ['', ],
      recordId: ['', ],
      sessionDate: ['', ],
      nextDate: ['', ],
      updatedAt: ['', ],
      therapist: this.formBuilder.group({
        id: ['', ],
        name: ['', ],
        last_name: ['', ],
        second_last_name: ['', ],
        phone: ['', ],
        speciality: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      })
    });
  }

  checkSensitiveData(session) {
    if (session.openingSensitiveData === true) {
       session.psychologicalOpening = (session.therapist.id === Number(this.therapistId)) ? session.psychologicalOpening : 'Este contenido esta protegido por el creador';
    }
    if (session.developmentSensitiveData === true) {
       session.psychologicalDevelopment = (session.therapist.id === Number(this.therapistId)) ? session.psychologicalDevelopment : 'Este contenido esta protegido por el creador';
    }
    if (session.agreementsSensitiveData === true) {
       session.psychologicalAgreements = (session.therapist.id === Number(this.therapistId)) ? session.psychologicalAgreements : 'Este contenido esta protegido por el creador';
    }
    return session;
  }

}
