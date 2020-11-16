import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {
  RECORD_FORM_CONST as FormsConstants
} from 'src/app/shared/utils/record-form-constants';
import { MatDialog } from '@angular/material/dialog';
import { ListUserDialogComponent } from 'src/app/modules/users/components/list-user-dialog/list-user-dialog.component';
import { MedicalReleaseService } from 'src/app/shared/services/medical-release.service';
import { DropService } from 'src/app/shared/services/drop.service';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { SatisfactionSurveyService } from 'src/app/shared/services/satisfaction-survey.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-form-derivation',
  templateUrl: './form-derivation.component.html',
  styleUrls: ['./form-derivation.component.css']
})
export class FormDerivationComponent implements OnInit {

  //This variables are used when component is called inside other component and url data does no exist
  // i = instance
  @Input() iRecordId;
  @Input() iPersonId;
  @Input() iDerivationId;
  @Input() iAction = 'view-derivation';
  @Input() isChild = false;

  recordId;
  personId;
  derivationId;
  action;

  formsConstants = FormsConstants;
  derivationForm: FormGroup;
  derivation: any;
  derivedAreas: Observable < string[] > ;
  therapistName: string;

  medicalRelase: any;
  drop: any;
  survey: any // this is for drop only
  satisfactionSurvey: any; // This is for medical release only

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private derivationService: DerivationService,
    private medicalReleaseSevice: MedicalReleaseService,
    private dropService: DropService,
    private surveyService: SurveyService,
    private satisfactionSurveyService: SatisfactionSurveyService,
    private routes: ActivatedRoute,
    public dialog: MatDialog,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();
    
    if (this.action === 'view-derivation') {
      this.derivationService.get(this.derivationId).subscribe(data => {
        this.derivation = data;
        this.derivationForm.setValue(data);
        this.setTherapistName(data.therapist);
      }, error => {console.log(error); });
      this.derivationForm.disable();

      //Get medicalRelease or drop and survey if exists on view mode
      this.medicalReleaseSevice.getByMedicalReleaseByDerivationId(this.derivationId).subscribe((data) => {
        this.medicalRelase = data;
      });

      this.dropService.getByDropByDerivationId(this.derivationId).subscribe((data) => {
        this.drop = data;
      });

      this.surveyService.getBySurveyByDerivationId(this.derivationId).subscribe((data) => {
        this.survey = data;
      });

      this.satisfactionSurveyService.getByDerivationId(this.derivationId).subscribe((data) => {
        this.satisfactionSurvey = data;
      });


    } else if (this.action === 'edit-derivation') {
      this.derivationService.get(this.derivationId).subscribe(data => {
        this.derivationForm.setValue(data);
        this.setTherapistName(data.therapist);
      }, error => { console.log(error); });
    }
    
    this._initializeAutomcompleteFields();
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.recordId = this.iRecordId;
      this.personId = this.iPersonId;
      this.derivationId = this.iDerivationId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.recordId = params.recordId;
        this.personId = params.personId;
        this.derivationId = params.derivationId;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-derivation') {
      this.derivationForm.get(['recordId']).setValue(this.recordId); 
      this.derivationService.createDerivation(this.derivationForm.value).subscribe(data => {
        this.toastr.success('La derivación ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.derivationService.updateDerivation(this.derivationId, this.derivationForm.value).subscribe(data => {
        this.toastr.success('La derivación e ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  openTherapistsModal() {
    const dialogRef = this.dialog.open(ListUserDialogComponent, { width: '800px', height: '700px'});
    dialogRef.afterClosed().subscribe((res) => {
      this.setTherapistName(res.therapist)
      this.derivationForm.get(['therapist', 'id']).setValue(res.therapist.id); 
    });
  }

  formValidatorBuilder(): void {
    this.derivationForm = this.formBuilder.group({
      id: ['', ],
      derivedArea: ['', Validators.compose([Validators.required])],
      derivationType: ['', Validators.compose([Validators.required])],
      reEntryId: ['', ],
      reason: ['', ],
      recordId: ['', ],
      recoveryCost: ['', ],
      status: ['', Validators.compose([Validators.required])],
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
      })
    });
  }

  setTherapistName(therapist){
    this.therapistName = `${therapist.name} ${therapist.last_name} ${therapist.second_last_name}`;
  }

  requiredFieldValidation(field) {
    return this.derivationForm.get(field).invalid && this.derivationForm.get(field).touched;
  }

  private _initializeAutomcompleteFields() {
    this.derivedAreas = this.derivationForm.get(['derivedArea']).valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.formsConstants.derivedAreas))
    );
  }

  private _filter(value: string, optionList: any): string[] {
    const filterValue = value.toLowerCase();
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

}
