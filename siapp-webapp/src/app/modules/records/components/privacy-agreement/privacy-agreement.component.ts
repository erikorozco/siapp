import { Component, OnInit } from '@angular/core';
import { PrivacyAgreementService } from '../../../../shared/services/privacy-agreement.service';
import { ToastrService } from 'ngx-toastr';
import { PrivacyAgreement } from '../../../../shared/models/privacy-agreement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../shared/services/person.service';

@Component({
  selector: 'app-privacy-agreement',
   templateUrl: './privacy-agreement.component.html',
  styleUrls: ['./privacy-agreement.component.css']
})
export class PrivacyAgreementComponent implements OnInit {

  params: any;
  person: any;

  constructor(
    private privacyAgreementService: PrivacyAgreementService,
    private personService: PersonService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.routes.params.subscribe(params => {
      this.params = params;
    });

    this.getPersonInformation();

  }

  getPersonInformation() {
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = `${data.name} ${data.lastName} ${data.secondLastName}`;
    }, error => {
      console.log(error);
    });
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
