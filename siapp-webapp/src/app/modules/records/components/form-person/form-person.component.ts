import { Component, OnInit } from '@angular/core';
import { Person } from '../../../../shared/models/person.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from 'src/app/shared/services/person.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  personForm: FormGroup;
  person: Person;

  formProperties: any = {
    action: '',
    params: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService,
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
    });

    if (this.formProperties.action === 'view-person') {
      this.personService.getPerson(this.formProperties.params.id).subscribe(data => {
        this.person = data;
        this.personForm.setValue(data);
      }, error => {console.log(error); });
      this.personForm.disable();

    } else if (this.formProperties.action === 'edit-person') {
      this.personService.getPerson(this.formProperties.params.id).subscribe(data => {
        this.personForm.setValue(data);
      }, error => { console.log(error); });

    }

  }

  onSubmit() {
    if (this.formProperties.action === 'add-person') {
      this.person = this.personForm.value;
      this.person.active = true;

      this.personService.createPerson(this.personForm.value).subscribe(data => {
        this.toastr.success('El paciente ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'records']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.personService.updatePerson(this.formProperties.params.id, this.personForm.value).subscribe(data => {
        this.toastr.success('El paciente ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'records']);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  requiredFieldValidation(field) {
    return this.personForm.get(field).invalid && this.personForm.get(field).touched;
  }

  formValidatorBuilder(): void {
    this.personForm = this.formBuilder.group({
      id: ['', ],
      name: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      secondLastName: ['', Validators.compose([Validators.required])],
      phone: ['', ],
      email: ['', ],
      active: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ]
    });
  }

}
