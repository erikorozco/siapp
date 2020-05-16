import { Component, OnInit } from '@angular/core';
import { PrivacyAgreementService } from '../../../../shared/services/privacy-agreement.service';
import { ToastrService } from 'ngx-toastr';
import { PrivacyAgreement } from '../../../../shared/models/privacy-agreement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../shared/services/person.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-privacy-agreement',
   templateUrl: './privacy-agreement.component.html',
  styleUrls: ['./privacy-agreement.component.css']
})
export class PrivacyAgreementComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  readTermsFormControl = new FormControl(false, )

  params: any;
  person: any;
  privacyAccepted = false;

  constructor(
    private privacyAgreementService: PrivacyAgreementService,
    private personService: PersonService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    
    this.routes.params.subscribe(params => {
      this.params = params;
    });
    
    this.getPersonInformation();
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });

  }

  getPersonInformation() {
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = `${data.name} ${data.lastName} ${data.secondLastName}`;
    }, error => {
      console.log(error);
    });
  }

  agreeTerms() {
    console.log(this.readTermsFormControl)
  }

  captureSign({value}) {
    const privacyAgreement = {
      sign: value,
      person: {
        id: this.params.personId
      }
    };

    this.privacyAgreementService.createPrivacyAgreement(privacyAgreement).subscribe(data => {
      this.toastr.success('El acuerdo de privacidad ha isdo creado exitosamente', 'Operacion exitosa');
      this.router.navigate(['home', 'record-summary', this.params.personId]);
    }, error => {
      console.log(error);
      this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
    });
  }
}
