import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceTypesService } from 'src/app/shared/services/service-types.service';

@Component({
  selector: 'app-form-service-type',
  templateUrl: './form-service-type.component.html',
  styleUrls: ['./form-service-type.component.css']
})
export class FormServiceTypeComponent implements OnInit {
  
  serviceTypeId;
  action;
  serviceTypeForm: FormGroup;
  serviceType: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private serviceTypesService: ServiceTypesService
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-service-type') {
        this.serviceTypesService.get(this.serviceTypeId).subscribe(data => {
        this.serviceType = data;
        this.serviceTypeForm.setValue(this.serviceType);
      }, error => {console.log(error); });
      this.serviceTypeForm.disable();

    } else if (this.action === 'edit-service-type') {
      this.serviceTypesService.get(this.serviceTypeId).subscribe(data => {
        this.serviceTypeForm.setValue(data);
      }, error => { console.log(error); });
    }
  }

  initFormProperties() {
    this.routes.url.subscribe(url => {
      this.action = url[0].path;
    });
    
    this.routes.params.subscribe(params => {
      this.serviceTypeId = params.id;
    });
  }

  onSubmit() {
    if (this.action === 'add-service-type') {
      this.serviceTypesService.create(this.serviceTypeForm.value).subscribe(data => {
        this.toastr.success('El servicio ha sido creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'service-types']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.serviceTypesService.update(this.serviceTypeId, this.serviceTypeForm.value).subscribe(data => {
        this.toastr.success('El servicio ha sido actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'service-types']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.serviceTypeForm = this.formBuilder.group({
      id: [''],
      label: ['', Validators.compose([Validators.required])],
      value: ['', Validators.compose([Validators.required])],
      active: [true, ],
      createdAt: ['', ],
      updatedAt: ['', ],
    });
  }

  requiredFieldValidation(field) {
    return this.serviceTypeForm.get(field).invalid && this.serviceTypeForm.get(field).touched;
  }

}
