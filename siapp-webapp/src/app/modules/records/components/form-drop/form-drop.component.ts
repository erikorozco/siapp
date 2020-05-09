import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DropService } from 'src/app/shared/services/drop.service';
import {
  RECORD_FORM_CONST as FormsConstants
} from 'src/app/shared/utils/record-form-constants';
import { ListUserDialogComponent } from 'src/app/modules/users/components/list-user-dialog/list-user-dialog.component';

@Component({
  selector: 'app-form-drop',
  templateUrl: './form-drop.component.html',
  styleUrls: ['./form-drop.component.css']
})
export class FormDropComponent implements OnInit {

  //This variables are used when component is called inside other component and url data does no exist
  // i = instance
  @Input() iPersonId;
  @Input() iDropId;
  @Input() iDerivationId;
  @Input() iAction = 'view-drop';
  @Input() isChild = false;

  dropId;
  personId;
  derivationId;
  action;

  dropForm: FormGroup;
  witnessesArray = [];
  witnessesFormControlName = new FormControl('', Validators.compose([Validators.required]));
  witnessesFormControlSign = new FormControl('', Validators.compose([Validators.required]));
  drop: any;
  formsConstants = FormsConstants;
  therapistName: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dropService: DropService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-drop') {
        this.dropService.getByDropByDerivationId(this.derivationId).subscribe(data => {
        this.drop = data;
        this.drop['requesterBuilder'] = this.setRequestBuilder(data.whoRequestInfo);
        this.drop['familyContactBuilder'] = this.setFamilyContactBuilder(data.familyContact);
        this.setWitnesses(this.drop.witnesses);
        this.dropForm.setValue(this.drop);
        this.setTherapistName(this.drop.therapist);
      }, error => {console.log(error); });
      this.dropForm.disable();

    } else if (this.action === 'edit-drop') {
      this.dropService.getDrop(this.derivationId).subscribe(data => {
        this.dropForm.setValue(data);
        this.setTherapistName(data.therapist);
      }, error => { console.log(error); });
    }
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.dropId = this.iDropId;
      this.personId = this.iPersonId;
      this.derivationId = this.iDerivationId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });
      
      this.routes.params.subscribe(params => {
        this.dropId = params.dropId;
        this.personId = params.personId;
        this.derivationId = params.derivationId;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-drop') {
      this.dropForm.get(['derivation', 'id']).setValue(this.derivationId);
      this.dropForm.get(['familyContact']).setValue(this.getFamilyContact());
      this.dropForm.get(['whoRequestInfo']).setValue(this.getWhoRequestInfo());
      this.dropForm.get(['witnesses']).setValue(this.getWitnesses());

      this.dropService.createDrop(this.dropForm.value).subscribe(data => {
        this.toastr.success('El alta voluntaria o baja ha sido creada exitosamente', 'Operacion exitosa');
        this.toastr.success('Ahora es necesario llenar la encuesta de satisfacción', 'Operacion exitosa');
        this.router.navigate(['home', 'add-survey', this.derivationId ,'person', this.personId]);// Redirigira encuesta de satisfaccion
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.dropService.updateDrop(this.dropId, this.dropForm.value).subscribe(data => {
        this.toastr.success('El alta voluntaria o baja ha sido actualizada exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.dropForm = this.formBuilder.group({
      id: ['', ],
      clinicSummary: ['', Validators.compose([Validators.required])],
      comments: ['', ],
      dropType: ['', Validators.compose([Validators.required])],
      familyContact: ['', ],
      idResponsabilityLetter: ['', ],
      recommendations: ['', ],
      whoRequestInfo: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      witnesses: ['', ],
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
      }),
      requesterBuilder: this.formBuilder.group({
        name: ['', ],
        age: ['', ],
        relation: ['', ],
        sign: ['', ]
      }),
      familyContactBuilder: this.formBuilder.group({
        name: ['', ],
        phone: ['', ],
        sign: ['', ]
      })
    });
  }

  openTherapistsModal() {
    const dialogRef = this.dialog.open(ListUserDialogComponent, { width: '800px', height: '700px'});
    dialogRef.afterClosed().subscribe((res) => {
      this.setTherapistName(res.therapist)
      this.dropForm.get(['therapist', 'id']).setValue(res.therapist.id); 
    });
  }

  requiredFieldValidation(field) {
    return this.dropForm.get(field).invalid && this.dropForm.get(field).touched;
  }

  addWitness() {
    const witness = `${this.witnessesFormControlName.value}:${this.witnessesFormControlSign.value}`;
    this.witnessesArray.push(witness);
    this.witnessesFormControlName.setValue('')
    this.witnessesFormControlSign.setValue('')
  }

  setTherapistName(therapist){
    this.therapistName = `${therapist.name} ${therapist.last_name} ${therapist.second_last_name}`;
  }

  getWitnesses() {
    return this.witnessesArray.join(',');
  }

  getFamilyContact() {
    return `${this.dropForm.get(['familyContactBuilder', 'name']).value},${this.dropForm.get(['familyContactBuilder', 'sign']).value},${this.dropForm.get(['familyContactBuilder', 'phone']).value}`;
  }
  
  getWhoRequestInfo() {
    return `${this.dropForm.get(['requesterBuilder', 'name']).value},${this.dropForm.get(['requesterBuilder', 'age']).value},${this.dropForm.get(['requesterBuilder', 'relation']).value},${this.dropForm.get(['requesterBuilder', 'sign']).value}`;
  }


  setRequestBuilder (requesterStrng) {
    const requesterInfo = requesterStrng.split(',')
    return {

      name: requesterInfo[0],
      age: requesterInfo[1],
      relation: requesterInfo[2],
      sign: requesterInfo[3],    
    }
  }

  setFamilyContactBuilder (familyContactString) {
    const familyContactInfo = familyContactString.split(',')
    return {
      name: familyContactInfo[0],
      phone: familyContactInfo[1],
      sign: familyContactInfo[2],    
    }
  }

  setWitnesses(witnessString){
    this.witnessesArray = witnessString.split(',');
  }

}
