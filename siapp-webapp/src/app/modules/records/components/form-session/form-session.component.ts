import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../../../shared/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RECORD_FORM_CONST as SessionFormOptions } from 'src/app/shared/utils/record-form-constants';
import { PersonService } from '../../../../shared/services/person.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.css']
})
export class FormSessionComponent implements OnInit {

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
    private personService: PersonService
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
  }

  onSubmit() {

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
      psychologicalAgreements: ['', Validators.compose([Validators.required])],
      createdAt: ['', ],
      updatedAt: ['', ],
      active: ['', ],
      therapist: this.formBuilder.group({
        id: ['', ]
      })
    });
  }
}
