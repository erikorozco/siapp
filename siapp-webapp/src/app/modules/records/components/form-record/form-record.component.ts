import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecordService } from 'src/app/shared/services/record-service';
import { RECORD_FORM_CONST as RecordFormOptions } from 'src/app/shared/utils/record-form-constants';
import { Observable } from 'rxjs';
import {map, startWith, auditTime} from 'rxjs/operators';

@Component({
  selector: 'app-form-record',
  templateUrl: './form-record.component.html',
  styleUrls: ['./form-record.component.css']
})
export class FormRecordComponent implements OnInit {

  params: any;
  action: string;
  person: any;
  recordForm: FormGroup;
  recordFormOptions = RecordFormOptions;
  escolarities: Observable<string[]>;
  religions: Observable<string[]>;
  derivers: Observable<string[]>;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordSerive: RecordService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

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
    // let diff = ( currentDate.getTime() - bornDate.getTime() ) / 1000;
    // diff /= (60 * 60 * 24);
    // console.log( Math.abs(Math.round(diff / 365.25)) );
    this.recordForm.get(['age']).setValue(currentDate.getFullYear() - bornDate.getFullYear());
  }

  requiredFieldValidation(field) {
    return this.recordForm.get(field).invalid && this.recordForm.get(field).touched;
  }

  executeAction() {
    if (this.action === 'existing-person-opening-record') {
      this.personService.getPerson(this.params.personId).subscribe(data => {
        this.recordForm.get(['person']).setValue(data);
      }, error => {
        console.log(error);
      });

    } else if (this.action === 'edit-user') {
      // this.personService.getUser(this.params.personId).subscribe(data => {
      //   this.userForm.setValue(data);
      // }, error => { console.log(error); });

    }
  }
  // requiredFormatPattern(field) {
  //   if (this.recordForm.get([field]).errors) {
  //     return ('pattern' in this.recordForm.get([field]).errors);
  //   }
  //   return false;
  // }

  formValidatorBuilder(): void {
    this.recordForm = this.formBuilder.group({
      person: this.formBuilder.group({
        id: ['', ],
        name: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        secondLastName: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        active: ['', ],
        createdAt: ['', ],
        updatedAt: ['', ]
      }),
      therapists: this.formBuilder.array([]),
      address: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      alimentaryAlterations: ['', Validators.compose([Validators.required])],
      bmi: ['', Validators.compose([Validators.required])],
      bornDate: ['', Validators.compose([Validators.required])],
      chronicDisease: ['', Validators.compose([Validators.required])],
      ciminalRecords: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      civilStatus: ['', Validators.compose([Validators.required])],
      clinicExploration: ['', Validators.compose([Validators.required])],
      colony: ['', Validators.compose([Validators.required])],
      consultationDisposition: ['', Validators.compose([Validators.required])],
      createdAt: ['', ],
      creation: ['', ],
      derivedTo: ['', Validators.compose([Validators.required])],
      drinkAlcohol: ['', Validators.compose([Validators.required])],
      drinkAlcoholFrecuency: ['', Validators.compose([Validators.required])],
      drugsFrecuency: ['', Validators.compose([Validators.required])],
      economicDependent: ['', Validators.compose([Validators.required])],
      escolarity: ['', Validators.compose([Validators.required])],
      firstTime: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      houseStatus: ['', Validators.compose([Validators.required])],
      hygiene: ['', Validators.compose([Validators.required])],
      medicalServices: ['', Validators.compose([Validators.required])],
      medicine: ['', Validators.compose([Validators.required])],
      moneyShare: ['', Validators.compose([Validators.required])],
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
      sinceWhenAlimentaryAlterations: ['', Validators.compose([Validators.required])],
      sinceWhenMoodChanges: ['', Validators.compose([Validators.required])],
      sinceWhenSleepingAlterarions: ['', Validators.compose([Validators.required])],
      sinceWhenWorkOcupation: ['', Validators.compose([Validators.required])],
      size: ['', Validators.compose([Validators.required])],
      sleepingAlterations: ['', Validators.compose([Validators.required])],
      smoke: ['', Validators.compose([Validators.required])],
      smokeFrecuency: ['', Validators.compose([Validators.required])],
      speakingAlterations: ['', Validators.compose([Validators.required])],
      timeOnWorkStatus: ['', Validators.compose([Validators.required])],
      underTreatment: ['', Validators.compose([Validators.required])],
      walkingAlterations: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      whenWasFirstTime: ['', Validators.compose([Validators.required])],
      whichAlimentaryAlterations: ['', Validators.compose([Validators.required])],
      whichCriminalRecords: ['', Validators.compose([Validators.required])],
      whichDrugs: ['', Validators.compose([Validators.required])],
      whichSleepingAlterarions: ['', Validators.compose([Validators.required])],
      whoDerived: ['', Validators.compose([Validators.required])],
      whoWorks: ['', Validators.compose([Validators.required])],
      workOcupation: ['', Validators.compose([Validators.required])],
      workPlace: ['', Validators.compose([Validators.required])],
      workStatus: ['', Validators.compose([Validators.required])],
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

    this.derivers = this.recordForm.get(['whoDerived']).valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.recordFormOptions.derivers))
    );


  }

}
