import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrisisInterventionService } from 'src/app/shared/services/crisis-intervention.service';
import { RecordService } from 'src/app/shared/services/record-service';
import { DatePipe } from '@angular/common';
import {
  RECORD_FORM_CONST as RecordFormOptions
} from 'src/app/shared/utils/record-form-constants';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-crisis-intervention',
  templateUrl: './form-crisis-intervention.component.html',
  styleUrls: ['./form-crisis-intervention.component.css']
})
export class FormCrisisInterventionComponent implements OnInit {

  @Input() iPersonId;
  @Input() iCrisisInterventionId;
  @Input() iAction = 'view-crisis-intervention';
  @Input() isChild = false;

  personId;
  crisisInterventionId;
  action;
  recordFormOptions = RecordFormOptions;
  cities: Observable < string[] > ;
  locations: Observable < string[] > ;
  escolarities: Observable < string[] > ;
  derivedAreas: Observable < string[] > ;

  crisisInterventionForm: FormGroup;
  crisisIntervention: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private crisisInterventionService: CrisisInterventionService,
    private recordService: RecordService,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initFormProperties();
    this.formValidatorBuilder();

    if (this.action === 'view-crisis-intervention') {
      this.crisisInterventionService.get(this.crisisInterventionId).subscribe(data => {
        data['age'] = '';
        data['bornDate'] = this.setDate(data.bornDate);
        this.crisisIntervention = data;
        this.crisisInterventionForm.setValue(this.crisisIntervention);
       this.calculateAge();
    }, error => {console.log(error); });
    this.crisisInterventionForm.disable();

    } else if (this.action === 'edit-crisis-intervention') {
      this.crisisInterventionService.get(this.crisisInterventionId).subscribe(data => {
        data['bornDate'] = this.setDate(data.bornDate);
        data['age'] = '';
        this.crisisInterventionForm.setValue(data);
        this.calculateAge();
      }, error => { console.log(error); });
    } else if (this.action === 'add-crisis-intervention') {
      this.checkIfRecordExists()
    }
    this._initializeAutoCompleteFields()
  }

  initFormProperties() {
    if(this.isChild) {
      this.action = this.iAction;
      this.personId = this.iPersonId;
      this.crisisInterventionId = this.iCrisisInterventionId;
    } else {
      this.routes.url.subscribe(url => {
        this.action = url[0].path;
      });

      this.routes.params.subscribe(params => {
        this.personId = params.personId;
        this.crisisInterventionId = params.id;
      });
    }
  }

  onSubmit() {
    if (this.action === 'add-crisis-intervention') {
      this.crisisInterventionForm.get(['person', 'id']).setValue(this.personId); 
      this.crisisInterventionService.create(this.crisisInterventionForm.value).subscribe(data => {
        this.toastr.success('El reporte de intervención en crisis ha sido creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else {
      this.crisisInterventionService.update(this.crisisInterventionId, this.crisisInterventionForm.value).subscribe(data => {
        this.toastr.success('El reporte de intervención en crisis ha sido actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.personId]);
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  formValidatorBuilder(): void {
    this.crisisInterventionForm = this.formBuilder.group({
      id: ['', ],
      bornDate: ['', ],
      address: ['', ],
      age: ['', ],
      city: ['', ],
      colony: ['', ],
      commitments: ['', ],
      derivationType: ['', Validators.compose([Validators.required])],
      derivedTo: ['', Validators.compose([Validators.required])],
      escolarity: ['', ],
      familyContactName: ['', Validators.compose([Validators.required])],
      familyContactPhone: ['', ],
      gender: ['', ],
      location: ['', ],
      maritalStatus: ['', ],
      mentalStatus: ['', ],
      procedures: ['', ],
      reason: ['', ],
      createdAt: ['', ],
      updatedAt: ['', ],
      person: this.formBuilder.group({
        id: ['', ],
        name: ['', ],
        lastName: ['', ],
        secondLastName: ['', ],
        phone: ['', ],
        email: ['', ],
        active: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      }),
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
    return this.crisisInterventionForm.get(field).invalid && this.crisisInterventionForm.get(field).touched;
  }

  checkIfRecordExists() {
    this.recordService.getRecordByPersonId(this.personId).subscribe((res) => {
      if(res) {
        let a = this.setDate(res.bornDate)
        this.crisisInterventionForm.get(['bornDate']).setValue(a);
        this.crisisInterventionForm.get(['address']).setValue(res.address);
        this.crisisInterventionForm.get(['city']).setValue(res.city);
        this.crisisInterventionForm.get(['colony']).setValue(res.colony);
        this.crisisInterventionForm.get(['escolarity']).setValue(res.escolarity);
        this.crisisInterventionForm.get(['gender']).setValue(res.gender);
        this.crisisInterventionForm.get(['location']).setValue(res.location);
        this.crisisInterventionForm.get(['maritalStatus']).setValue(res.civilStatus);
        this.calculateAge();
      }
      console.log(this.crisisInterventionForm.value);
    })
  }
  
  calculateAge() {
    const bornDate = new Date(this.crisisInterventionForm.get(['bornDate']).value);
    const currentDate = new Date();
    this.crisisInterventionForm.get(['age']).setValue(currentDate.getFullYear() - bornDate.getFullYear());
    return currentDate.getFullYear() - bornDate.getFullYear();
  }

  setDate(date) {
    const datePipe: DatePipe = new DatePipe('es-MX');
    const a = new Date(date);
    let formattedDate =  datePipe.transform(date, 'yyyy-MM-dd' ,'es-MX')
    return formattedDate
  }

    // PRIVATE METHODS
    private _filter(value: string, optionList: any): string[] {
      const filterValue = value.toLowerCase();
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }

    private _initializeAutoCompleteFields() {
  
      this.escolarities = this.crisisInterventionForm.get(['escolarity']).valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.recordFormOptions.escolarities))
        );
  
      this.cities = this.crisisInterventionForm.get(['city']).valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.recordFormOptions.cities))
        );
  
      this.locations = this.crisisInterventionForm.get(['location']).valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.recordFormOptions.locations))
        );
  
      this.derivedAreas = this.crisisInterventionForm.get(['derivedTo']).valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.recordFormOptions.derivedAreas))
        );  
  
    }

}
