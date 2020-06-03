import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  RECORD_FORM_CONST as FormsConstants
} from 'src/app/shared/utils/record-form-constants';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SatisfactionSurveyService } from 'src/app/shared/services/satisfaction-survey.service';
import { Observable } from 'rxjs';
import { ListUserDialogComponent } from 'src/app/modules/users/components/list-user-dialog/list-user-dialog.component';

@Component({
  selector: 'app-form-satisfaction-survey',
  templateUrl: './form-satisfaction-survey.component.html',
  styleUrls: ['./form-satisfaction-survey.component.css']
})
export class FormSatisfactionSurveyComponent implements OnInit {

  @Input() iPersonId;
  @Input() iSatisfactionSurveyId;
  @Input() iDerivationId;
  @Input() iAction = 'view-satisfaction-survey';
  @Input() isChild = false;

  satisfactionSurveyId;
  personId;
  derivationId;
  action;

  satisfactionSurveyForm: FormGroup;
  personalReasons: Observable < string[] > ;
  serviceReasons: Observable < string[] > ;
  satisfactionSurvey: any;
  formsConstants = FormsConstants;
  therapistName: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private satisfactionSurveyService: SatisfactionSurveyService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-satisfaction-survey') {
      this.satisfactionSurveyService.getByDerivationId(this.derivationId).subscribe(data => {
      this.satisfactionSurvey = data;
      this.satisfactionSurveyForm.setValue(this.satisfactionSurvey);
      this.setTherapistName(this.satisfactionSurvey.therapist);
    }, error => {console.log(error); });
    this.satisfactionSurveyForm.disable();

  } else if (this.action === 'edit-satisfaction-survey') {
    this.satisfactionSurveyService.get(this.derivationId).subscribe(data => {
      this.satisfactionSurveyForm.setValue(data);
      this.setTherapistName(data.therapist);
    }, error => { console.log(error); });
  }

  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.satisfactionSurveyId = this.iSatisfactionSurveyId;
      this.personId = this.iPersonId;
      this.derivationId = this.iDerivationId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });
      
      this.routes.params.subscribe(params => {
        this.satisfactionSurveyId = params.satisfactionSurveyId;
        this.personId = params.personId;
        this.derivationId = params.derivationId;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-satisfaction-survey') {
      this.satisfactionSurveyForm.get(['derivation', 'id']).setValue(this.derivationId);
      this.satisfactionSurveyForm.get(['result']).setValue(this.calculateResult());
      this.satisfactionSurveyService.createSurvey(this.satisfactionSurveyForm.value).subscribe(data => {
        this.toastr.success('La encuesta ha sido creada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.satisfactionSurveyService.updateSurvey(this.satisfactionSurveyId, this.satisfactionSurveyForm.value).subscribe(data => {
        this.toastr.success('La encuesta ha sido actualizada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.satisfactionSurveyForm = this.formBuilder.group({
      id: ['', ],
      problemTreat: ['', Validators.compose([Validators.required])],
      helpTreat: ['', Validators.compose([Validators.required])],
      initialEmotionalState: ['', Validators.compose([Validators.required])],
      finalEmotionalState: ['', Validators.compose([Validators.required])],
      therapistPuntuality: ['', Validators.compose([Validators.required])],
      therapistCompliance: ['', Validators.compose([Validators.required])],
      result: ['', ],
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
      if(res) {
        this.setTherapistName(res.therapist)
        this.satisfactionSurveyForm.get(['therapist', 'id']).setValue(res.therapist.id); 
      }
    });
  }

  requiredFieldValidation(field) {
    return this.satisfactionSurveyForm.get(field).invalid && this.satisfactionSurveyForm.get(field).touched;
  }

  setTherapistName(therapist){
    this.therapistName = `${therapist.name} ${therapist.last_name} ${therapist.second_last_name}`;
  }

  calculateResult() {
    let result = 
    Number(this.satisfactionSurveyForm.get(['problemTreat']).value) +
    Number(this.satisfactionSurveyForm.get(['helpTreat']).value) +
    Number(this.satisfactionSurveyForm.get(['initialEmotionalState']).value) +
    Number(this.satisfactionSurveyForm.get(['finalEmotionalState']).value) +
    Number(this.satisfactionSurveyForm.get(['therapistPuntuality']).value) +
    Number(this.satisfactionSurveyForm.get(['therapistCompliance']).value);
    return result;
  }

}
