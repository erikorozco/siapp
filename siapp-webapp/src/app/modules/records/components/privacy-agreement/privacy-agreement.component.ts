import { Component, OnInit } from '@angular/core';
import { PrivacyAgreementService } from '../../../../shared/services/privacy-agreement.service';
import { ToastrService } from 'ngx-toastr';
import { PrivacyAgreement } from '../../../../shared/models/privacy-agreement.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-privacy-agreement',
   templateUrl: './privacy-agreement.component.html',
  styleUrls: ['./privacy-agreement.component.css']
})
export class PrivacyAgreementComponent implements OnInit {

  params: any;

  constructor(
    private privacyAgreementService: PrivacyAgreementService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.params = params;
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
