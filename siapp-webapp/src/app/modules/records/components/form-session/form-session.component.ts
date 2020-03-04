import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  sessionForm: FormGroup;
  session: any;
  record: any;
  person: any;
  sessionFormOptions = SessionFormOptions;
  formProperties: any = {
    action: '',
    params: {}
  };

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

    if (this.formProperties.action === 'view-session') {
      this.sessionService.getSession(this.formProperties.params.id).subscribe(data => {
        this.session = data;
        this.sessionForm.setValue(data);
      }, error => {console.log(error); });
      this.sessionForm.disable();

    } else if (this.formProperties.action === 'edit-session') {
      this.sessionService.getSession(this.formProperties.params.id).subscribe(data => {
        this.sessionForm.setValue(data);
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
}
