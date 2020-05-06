import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-derivation',
  templateUrl: './form-derivation.component.html',
  styleUrls: ['./form-derivation.component.css']
})
export class FormDerivationComponent implements OnInit {

  derivationForm: FormGroup;
  derivation: any;
  recordId;
  personId;

  formProperties: any = {
    action: '',
    params: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private derivationService: DerivationService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();

    this.routes.url.subscribe(url => {
      this.formProperties.action = url[0].path;
    });

    this.routes.params.subscribe(params => {
      this.formProperties.params = params;
      this.recordId = this.formProperties.params.recordId;
      this.personId = this.formProperties.params.personId;
    });
    

    if (this.formProperties.action === 'view-derivation') {
      this.derivationService.createDerivation(this.recordId).subscribe(data => {
        this.derivation = data;
        this.derivationForm.setValue(data);
      }, error => {console.log(error); });
      this.derivationForm.disable();

    } else if (this.formProperties.action === 'edit-derivation') {
      this.derivationService.get(this.recordId).subscribe(data => {
        this.derivationForm.setValue(data);
      }, error => { console.log(error); });

    }

  }

  onSubmit() {
    if (this.formProperties.action === 'add-derivation') {
      this.derivation = this.derivationForm.value;
      this.derivation.active = true;

      this.derivationService.createDerivation(this.derivationForm.value).subscribe(data => {
        this.toastr.success('La derivación ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.recordId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.derivationService.updateDerivation(this.formProperties.params.id, this.derivationForm.value).subscribe(data => {
        this.toastr.success('La derivación e ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'records', this.recordId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  requiredFieldValidation(field) {
    return this.derivationForm.get(field).invalid && this.derivationForm.get(field).touched;
  }

  formValidatorBuilder(): void {
    this.derivationForm = this.formBuilder.group({
      id: ['', ],
      derivedArea: ['', Validators.compose([Validators.required])],
      externalDerivation: ['', Validators.compose([Validators.required])],
      reEntryId: ['', ],
      reason: ['', ],
      recordId: ['', ],
      recoveryCost: ['', ],
      status: ['', ],
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
      })
    });
  }

}
