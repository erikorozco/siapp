import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NutritionSessionService } from 'src/app/shared/services/nutrition-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-nutrition-session',
  templateUrl: './form-nutrition-session.component.html',
  styleUrls: ['./form-nutrition-session.component.css']
})
export class FormNutritionSessionComponent implements OnInit {

  @Input() iRecordId;
  @Input() iPersonId;
  @Input() iNutritionSessionId;
  @Input() iAction = 'view-nutrition-session';
  @Input() isChild = false;

  recordId;
  personId;
  nutritionSessionId;
  action;

  nutritionSessionForm: FormGroup;
  nutritionSession: any;
  bmiText: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nutritionSessionService: NutritionSessionService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.formValidatorBuilder();
    this.initFormProperties();

    if (this.action === 'view-nutrition-session') {
      this.nutritionSessionService.get(this.nutritionSessionId).subscribe(data => {
      this.nutritionSession = data;
      this.nutritionSessionForm.setValue(this.nutritionSession);
    }, error => {console.log(error); });
    this.nutritionSessionForm.disable();

    } else if (this.action === 'edit-nutrition-session') {
      this.nutritionSessionService.get(this.nutritionSessionId).subscribe(data => {
        this.nutritionSessionForm.setValue(data);
      }, error => { console.log(error); });
    }
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.recordId = this.iRecordId;
      this.personId = this.iPersonId;
      this.nutritionSessionId = this.iNutritionSessionId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.recordId = params.recordId;
        this.personId = params.personId;
        this.nutritionSessionId = params.id;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-nutrition-session') {
      this.nutritionSessionForm.get(['recordId']).setValue(this.recordId); 
      this.nutritionSessionService.create(this.nutritionSessionForm.value).subscribe(data => {
        this.toastr.success('El reporte nutricional ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.nutritionSessionService.update(this.nutritionSessionId, this.nutritionSessionForm.value).subscribe(data => {
        this.toastr.success('El reporte nutricional ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.nutritionSessionForm = this.formBuilder.group({
      id: ['', ],
      advance: ['', ],
      comments: ['', ],
      diagnostic: ['', ],
      plan: ['', ],
      symptoms: ['', ],
      bmi: ['', ],
      size: ['', ],
      weight: ['', ],
      recordId: ['', ],
      sessionNumber: ['', ],
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

  requiredFieldValidation(field) {
    return this.nutritionSessionForm.get(field).invalid && this.nutritionSessionForm.get(field).touched;
  }

  calculateBMI() {
    const weight = this.nutritionSessionForm.get(['weight']).value;
    const size = this.nutritionSessionForm.get(['size']).value / 100;
    if (weight > 0 && size > 0) {
      const bmi = (weight / (size * size));
      this.nutritionSessionForm.get(['bmi']).setValue(bmi.toFixed(2));

      if (bmi > 30) {
        this.bmiText = 'Obesidad';
      } else if (bmi > 25 && bmi < 29.99) {
        this.bmiText = 'Sobrepeso';
      } else if (bmi > 18.5 && bmi < 24.99) {
        this.bmiText = 'Peso saludable';
      } else if (bmi < 18.5) {
        this.bmiText = 'Bja peso';
      }

    }
  }

}
