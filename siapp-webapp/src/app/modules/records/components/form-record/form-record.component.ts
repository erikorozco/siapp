import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  PersonService
} from 'src/app/shared/services/person.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  ToastrService
} from 'ngx-toastr';
import {
  RecordService
} from 'src/app/shared/services/record-service';
import {
  RECORD_FORM_CONST as RecordFormOptions
} from 'src/app/shared/utils/record-form-constants';
import {
  Observable,
  interval,
  Subscription
} from 'rxjs';
import {
  map,
  startWith,
  flatMap
} from 'rxjs/operators';
import {
  StringUtil
} from 'src/app/shared/utils/string-util';
import {
  DerivationService
} from 'src/app/shared/services/derivation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-record',
  templateUrl: './form-record.component.html',
  styleUrls: ['./form-record.component.css']
})
export class FormRecordComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  stringUtil = StringUtil;
  bmiText: string;
  params: any;
  action: string;
  person: any;
  record: any;
  recordForm: FormGroup;
  recordFormOptions = RecordFormOptions;
  escolarities: Observable < string[] > ;
  religions: Observable < string[] > ;
  derivers: Observable < string[] > ;
  professionals: Observable < string[] > ;
  cities: Observable < string[] > ;
  locations: Observable < string[] > ;
  parishes: Observable < string[] > ;
  externalAreas: Observable < string[] > ;
  medicalServicesFormControl = new FormControl([]);
  //otherDerivedAreaFormControl = new FormControl('', Validators.compose([Validators.required]));
  //derivedAreasFormControl = new FormControl([]);
  //otherDerivedAreas = [];
  //derivedQuantitesFormGroup: FormGroup;
  //otherDerivedQuantitesFormGroup: FormGroup;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordService: RecordService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formValidatorBuilder();
    this.routes.url.subscribe(url => {
      this.action = url[0].path;
    });

    this.routes.params.subscribe(params => {
      this.params = params;
    });

    this.executeAction();
    this.getPersonInformation();
    this._initializeAutoCompleteFields();

    this.checkRecordUnsaved();
    const source = interval(15000);
    this.subscription = source.subscribe(val => this.saveRecordProgress());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveRecordProgress() {
    const recordProgress = JSON.stringify(this.recordForm.value);
    window.localStorage.setItem('recordFormFillProgress', recordProgress);
  }

  checkRecordUnsaved() {
    if (window.localStorage.getItem('recordFormFillProgress')) {
      const recordProgress = JSON.parse(window.localStorage.getItem('recordFormFillProgress'));
      if (recordProgress.person.id === parseInt(this.params.personId, 10)) {
        if (confirm(`Existe un registro sin guardar de ${recordProgress.person.name} ${recordProgress.person.lastName} ${recordProgress.person.secondLastName} ¿Deseas seguir capturando?`)) {
          this.recordForm.setValue(recordProgress);
        } else {
          window.localStorage.removeItem('recordFormFillProgress');
          window.localStorage.clear();
        }
      }
    }
  }

  getPersonInformation() {
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = data;
    }, error => {
      console.log(error);
    });
  }

  calculateAge() {
    const bornDate = new Date(this.recordForm.get(['bornDate']).value);
    const currentDate = new Date();
    const a = currentDate.getFullYear() - bornDate.getFullYear()
    let months = (a * 12) + (currentDate.getMonth() - bornDate.getMonth()) ;

    this.recordForm.get(['age']).setValue( Math.floor(months/12));
  }

  setDate(date) {
    const datePipe: DatePipe = new DatePipe('es-MX');
    const a = new Date(date);
    let formattedDate =  datePipe.transform(date, 'yyyy-MM-dd' ,'es-MX')
    return formattedDate
  }

  calculateBMI() {
    const weight = this.recordForm.get(['weight']).value;
    const size = this.recordForm.get(['size']).value / 100;
    if (weight > 0 && size > 0) {
      const bmi = (weight / (size * size));
      this.recordForm.get(['bmi']).setValue(bmi);

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

  requiredFieldValidation(field) {
    return this.recordForm.get(field).invalid && this.recordForm.get(field).touched;
  }

  requiredRadioInputValidation(radioValue, textInputValue) {
    if (radioValue === false || radioValue === 'NO') {
      return false;
    } else if (radioValue === true && textInputValue === '') {
      return true;
    } else if (radioValue === 'SI' && textInputValue === '') {
      return true;
    }
  }

  onSubmit() {
    this.subscription.unsubscribe(); // Unsubscribe the progress listener
    if (this.action === 'existing-person-opening-record') {
      this.recordForm.get(['medicalServices']).setValue(this.medicalServicesFormControl.value.join(','));
      this.recordForm.get(['creation']).setValue(new Date());
      this.record = this.recordForm.value;

      this.recordService.createRecord(this.record).subscribe(data => {
        this.toastr.success('El expediente ha isdo creado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.params.personId]);
        window.localStorage.removeItem('recordFormFillProgress');
        window.localStorage.clear();
      }, error => {
        if (error.status === 409) {
          this.toastr.warning('Ya existe un expediente dado de alta para este paciente', 'Operacion invalida');
        } else {
          this.toastr.error('Hubo un error guardar el expediente', 'Operacion fallida');
        }
        console.log(error);
      });
    } else {
      this.recordService.updateRecord(this.params.recordId, this.recordForm.value).subscribe(data => {
        this.toastr.success('El expediente ha isdo actualizado exitosamente', 'Operacion exitosa');
        this.router.navigate(['home', 'record-summary', this.params.personId]);
        window.localStorage.removeItem('recordFormFillProgress');
        window.localStorage.clear();
      }, error => {
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });
    }
  }

  executeAction() {
    if (this.action === 'existing-person-opening-record') {
      this.personService.getPerson(this.params.personId).subscribe(data => {
        this.recordForm.get(['person']).setValue(data);
      }, error => {
        console.log(error);
        this.toastr.error('Ocurrio un error, Intente de Nuevo', 'Operacion invalida');
      });

    } else if (this.action === 'edit-record') {
      this.recordService.getRecordByPersonId(this.params.personId).subscribe(data => {
        data.bornDate = this.setDate(data.bornDate);
        data.therapists  = [];
        this.recordForm.setValue(data);
      }, error => { console.log(error); });

    }
  }

  formValidatorBuilder(): void {
    this.recordForm = this.formBuilder.group({
      person: this.formBuilder.group({
        id: ['', ],
        name: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        secondLastName: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        email: ['', ],
        active: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      }),
      id: ['', ],
      therapists: this.formBuilder.array([]),
      address: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      alimentaryAlterations: ['', Validators.compose([Validators.required])],
      bmi: ['', Validators.compose([Validators.required])],
      bornDate: ['', Validators.compose([Validators.required])],
      chronicDisease: ['', Validators.compose([Validators.required])],
      ciminalRecords: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      civilStatus: ['', Validators.compose([Validators.required])],
      clinicExploration: ['', Validators.compose([Validators.required])],
      colony: ['', Validators.compose([Validators.required])],
      consultationDisposition: ['', Validators.compose([Validators.required])],
      createdAt: ['', ],
      updatedAt: ['', ],
      creation: ['', ],
      derivedTo: [' ', ],
      genogram: ['', ],
      // genogramUpload: ['', ],
      //derivationType: ['', ],
      drinkAlcohol: ['', Validators.compose([Validators.required])],
      drinkAlcoholFrecuency: ['', ],
      drugsFrecuency: ['', ],
      economicDependent: ['', Validators.compose([Validators.required])],
      escolarity: ['', Validators.compose([Validators.required])],
      firstTime: ['', Validators.compose([Validators.required])],
      familyContact: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      houseStatus: ['', Validators.compose([Validators.required])],
      hygiene: ['', Validators.compose([Validators.required])],
      medicalServices: ['', ],
      medicine: ['', Validators.compose([Validators.required])],
      moneyShare: [' ', ],
      monthlyIncome: ['', Validators.compose([Validators.required])],
      moodChanges: ['', Validators.compose([Validators.required])],
      notes: ['', Validators.compose([Validators.required])],
      numberOfDependents: ['', Validators.compose([Validators.required])],
      numberOfDependentsThatBringMoney: ['', Validators.compose([Validators.required])],
      ocupation: ['', Validators.compose([Validators.required])],
      otherDrugs: ['', Validators.compose([Validators.required])],
      parish: ['', Validators.compose([Validators.required])],
      patientStatus: ['', Validators.compose([Validators.required])],
      presuntiveDiagnostic: ['', Validators.compose([Validators.required])],
      professionalWhoAttended: ['', Validators.compose([Validators.required])],
      raatention: ['', Validators.compose([Validators.required])],
      raplace: ['', Validators.compose([Validators.required])],
      rareason: ['', Validators.compose([Validators.required])],
      ratimes: ['', Validators.compose([Validators.required])],
      ratreatmentFinished: ['', Validators.compose([Validators.required])],
      recordType: ['', Validators.compose([Validators.required])],
      religion: ['', Validators.compose([Validators.required])],
      senorityOfWork: ['', Validators.compose([Validators.required])],
      sinceWhenAlimentaryAlterations: ['', ],
      sinceWhenMoodChanges: ['', ],
      sinceWhenSleepingAlterarions: ['', ],
      sinceWhenWorkOcupation: ['', Validators.compose([Validators.required])],
      size: ['', Validators.compose([Validators.required])],
      sleepingAlterations: ['', Validators.compose([Validators.required])],
      smoke: ['', Validators.compose([Validators.required])],
      smokeFrecuency: ['', ],
      speakingAlterations: ['', ],
      timeOnWorkStatus: ['', Validators.compose([Validators.required])],
      underTreatment: ['', Validators.compose([Validators.required])],
      version: ['2',],
      walkingAlterations: ['', ],
      weight: ['', Validators.compose([Validators.required])],
      whenWasFirstTime: ['', Validators.compose([Validators.required])],
      whichAlimentaryAlterations: ['', ],
      whichCriminalRecords: ['', ],
      whichDrugs: ['', ],
      whichSleepingAlterarions: ['', ],
      whoDerived: ['', Validators.compose([Validators.required])],
      whoWorks: ['', Validators.compose([Validators.required])],
      workOcupation: ['', Validators.compose([Validators.required])],
      workPlace: ['', Validators.compose([Validators.required])],
      workStatus: ['', Validators.compose([Validators.required])]
    });
  }

  // PRIVATE METHODS
  private _filter(value: string, optionList: any): string[] {
    const filterValue = value.toLowerCase();
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _initializeAutoCompleteFields() {
    this.religions = this.recordForm.get(['religion']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.religions))
      );

    this.escolarities = this.recordForm.get(['escolarity']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.escolarities))
      );

    this.cities = this.recordForm.get(['city']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.cities))
      );

    // this.externalAreas = this.recordForm.get(['externalDerivationForm', 'derivedArea']).valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value, this.recordFormOptions.externalAreas))
    //   );

    this.locations = this.recordForm.get(['location']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.locations))
      );

    this.parishes = this.recordForm.get(['parish']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.parishes))
      );

    this.derivers = this.recordForm.get(['whoDerived']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.derivers))
      );

    this.professionals = this.recordForm.get(['professionalWhoAttended']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.professionalWhoAttended))
      );

  }

}
