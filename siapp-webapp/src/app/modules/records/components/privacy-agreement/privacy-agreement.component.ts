import { Component, OnInit, Input } from '@angular/core';
import { PrivacyAgreementService } from '../../../../shared/services/privacy-agreement.service';
import { ToastrService } from 'ngx-toastr';
import { PrivacyAgreement } from '../../../../shared/models/privacy-agreement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../shared/services/person.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RecordService } from 'src/app/shared/services/record-service';

@Component({
  selector: 'app-privacy-agreement',
   templateUrl: './privacy-agreement.component.html',
  styleUrls: ['./privacy-agreement.component.css']
})
export class PrivacyAgreementComponent implements OnInit {

  @Input() isViewOnly = false;
  @Input() iPersonId;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  readTermsFormControl = new FormControl(false, )
  commitmentLetterFormControl = new FormControl(false, )

  privacyAgreement: any;
  personId: any;
  person: any;
  record: any;
  date: any;
  personSign: any;
  coordinatorSign: any;

  constructor(
    private privacyAgreementService: PrivacyAgreementService,
    private personService: PersonService,
    private recordService: RecordService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.date = new Date();
    
    if (!this.isViewOnly) {
      this.routes.params.subscribe(params => {
        this.personId = params.personId;
      });
    } else {
      this.personId = this.iPersonId;
    }
    
    this.getPrivacyAgreement();
    this.getPersonInformation();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  getPersonInformation() {

    this.recordService.getRecordByPersonId(this.personId).subscribe((data) => {
      this.record = data;
    });

    this.personService.getPerson(this.personId).subscribe(data => {
      this.person = `${data.name} ${data.lastName} ${data.secondLastName}`;
    }, error => {
      console.log(error);
    });
  }

  getPrivacyAgreement() {
    this.privacyAgreementService.getPrivacyAgreement(this.personId).subscribe((data) => {
      this.privacyAgreement = data;
    }, error => {
      console.log(error)
    });
  };

  capturePersonSign({value}) {
    this.personSign = value;
  }

  captureSign({value}) {
    const privacyAgreement = {
      sign: this.personSign,
      coordinatorSign: value,
      person: {
        id: this.personId
      }
    };

    this.privacyAgreementService.createPrivacyAgreement(privacyAgreement).subscribe(data => {
      this.toastr.success('El acuerdo de privacidad ha sido creado exitosamente', 'Operacion exitosa');
      this.router.navigate(['home', 'record-summary', this.personId]);
    }, error => {
      console.log(error);
      this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
    });
  }
}
