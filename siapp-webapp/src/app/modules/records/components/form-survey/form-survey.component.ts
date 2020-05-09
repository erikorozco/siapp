import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  RECORD_FORM_CONST as FormsConstants
} from 'src/app/shared/utils/record-form-constants';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ListUserDialogComponent } from 'src/app/modules/users/components/list-user-dialog/list-user-dialog.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-survey',
  templateUrl: './form-survey.component.html',
  styleUrls: ['./form-survey.component.css']
})
export class FormSurveyComponent implements OnInit {

  @Input() iPersonId;
  @Input() iSurveyId;
  @Input() iDerivationId;
  @Input() iAction = 'view-survey';
  @Input() isChild = false;

  surveyId;
  personId;
  derivationId;
  action;

  surveyForm: FormGroup;
  personalReasons: Observable < string[] > ;
  serviceReasons: Observable < string[] > ;
  survey: any;
  formsConstants = FormsConstants;
  therapistName: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-survey') {
      this.surveyService.getBySurveyByDerivationId(this.derivationId).subscribe(data => {
      this.survey = data;
      this.surveyForm.setValue(this.survey);
      this.setTherapistName(this.survey.therapist);
    }, error => {console.log(error); });
    this.surveyForm.disable();

  } else if (this.action === 'edit-drop') {
    this.surveyService.getSurvey(this.derivationId).subscribe(data => {
      this.surveyForm.setValue(data);
      this.setTherapistName(data.therapist);
    }, error => { console.log(error); });
  }

    this._initializeAutomcompleteFields();
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.surveyId = this.iPersonId;
      this.personId = this.iPersonId;
      this.derivationId = this.iDerivationId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });
      
      this.routes.params.subscribe(params => {
        this.surveyId = params.dropId;
        this.personId = params.personId;
        this.derivationId = params.derivationId;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-survey') {
      this.surveyForm.get(['derivation', 'id']).setValue(this.derivationId);

      this.surveyService.createSurvey(this.surveyForm.value).subscribe(data => {
        this.toastr.success('La encuesta ha sido creada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.surveyService.updateSurvey(this.surveyId, this.surveyForm.value).subscribe(data => {
        this.toastr.success('La encuesta ha sido actualizada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.surveyForm = this.formBuilder.group({
      id: ['', ],
      personalReason: ['', ],
      serviceReason: ['',],
      createdAt: ['', ],
      updatedAt: ['', ],
      therapist: this.formBuilder.group({
        id: ['', Validators.compose([Validators.required])],
        name: ['', ],
        last_name: ['', ],
        second_last_name: ['', ],
        phone: ['', ],
        speciality: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      }),
      derivation: this.formBuilder.group({
        id: ['', ],
        derivationType: ['', ],
        derivedArea: ['', ],
        reEntryId: ['', ],
        reason: ['', ],
        recordId: ['', ],
        recoveryCost: ['', ],
        status: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ],
        therapist: [{}]
      })
    });
  }

  openTherapistsModal() {
    const dialogRef = this.dialog.open(ListUserDialogComponent, { width: '800px', height: '700px'});
    dialogRef.afterClosed().subscribe((res) => {
      this.setTherapistName(res.therapist)
      this.surveyForm.get(['therapist', 'id']).setValue(res.therapist.id); 
    });
  }

  requiredFieldValidation(field) {
    return this.surveyForm.get(field).invalid && this.surveyForm.get(field).touched;
  }

  setTherapistName(therapist){
    this.therapistName = `${therapist.name} ${therapist.last_name} ${therapist.second_last_name}`;
  }

  private _initializeAutomcompleteFields() {
    this.personalReasons = this.surveyForm.get(['personalReason']).valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.formsConstants.personalReasons))
    );

    this.serviceReasons = this.surveyForm.get(['serviceReason']).valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.formsConstants.serviceReasons))
    );
  }

  private _filter(value: string, optionList: any): string[] {
    const filterValue = value.toLowerCase();
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

}
