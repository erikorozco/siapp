import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MedicalReleaseService } from 'src/app/shared/services/medical-release.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-medical-release',
  templateUrl: './form-medical-release.component.html',
  styleUrls: ['./form-medical-release.component.css']
})
export class FormMedicalReleaseComponent implements OnInit {

    //This variables are used when component is called inside other component and url data does no exist
  // i = instance
  @Input() iPersonId;
  @Input() iMedicalReleaseId;
  @Input() iDerivationId;
  @Input() iAction = 'view-medical-release';
  @Input() isChild = false;

  medicalReleaseId;
  personId;
  derivationId;
  action;

  medicalReleaseForm: FormGroup;
  medicalRelease: any;
  therapistName: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicalReleaseService: MedicalReleaseService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-medical-release') {
      this.medicalReleaseService.getByMedicalReleaseByDerivationId(this.derivationId).subscribe(data => {
        this.medicalRelease = data;
        this.medicalReleaseForm.setValue(data);
        this.setTherapistName(data.therapist);
      }, error => {console.log(error); });
      this.medicalReleaseForm.disable();

    } else if (this.action === 'edit-medical-release') {
      this.medicalReleaseService.getByMedicalReleaseByDerivationId(this.derivationId).subscribe(data => {
        this.medicalReleaseForm.setValue(data);
        //this.setTherapistName(data.therapist);
      }, error => { console.log(error); });
    }
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.medicalReleaseId = this.iMedicalReleaseId;
      this.personId = this.iPersonId;
      this.derivationId = this.iDerivationId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.medicalReleaseId = params.medicalReleaseId;
        this.personId = params.personId;
        this.derivationId = params.derivationId;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-medical-release') {
      this.medicalReleaseForm.get(['derivation', 'id']).setValue(this.derivationId); 
      this.medicalReleaseService.createMedicalRelease(this.medicalReleaseForm.value).subscribe(data => {
        this.toastr.success('El alta ha sido creada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.medicalReleaseService.updateMedicalRelease(this.medicalReleaseId, this.medicalReleaseForm.value).subscribe(data => {
        this.toastr.success('El alta ha sido actualizada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }


  formValidatorBuilder(): void {
    this.medicalReleaseForm = this.formBuilder.group({
      id: ['', ],
      actualStatus: ['', Validators.compose([Validators.required])],
      ationPlan: ['', Validators.compose([Validators.required])],
      bahaviorDuringStay: ['', ],
      diagnostic: ['', ],
      diagnosticSummary: ['', ],
      pendingProblems: ['', ],
      reason: ['', Validators.compose([Validators.required])],
      recommendations: ['', ],
      releaseDate: ['', Validators.compose([Validators.required])],
      createdAt: ['', ],
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

  requiredFieldValidation(field) {
    return this.medicalReleaseForm.get(field).invalid && this.medicalReleaseForm.get(field).touched;
  }

  setTherapistName(therapist){
    this.therapistName = `${therapist.name} ${therapist.last_name} ${therapist.second_last_name}`;
  }

}
