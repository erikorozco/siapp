import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from 'src/app/shared/services/record-service';
import { DateTimeHelper } from 'src/app/shared/utils/DateTimeHelper';
import {
  RECORD_FORM_CONST as RecordFormOptions
} from 'src/app/shared/utils/record-form-constants';

@Component({
  selector: 'app-form-ticket-person-data',
  templateUrl: './form-ticket-person-data.component.html',
  styleUrls: ['./form-ticket-person-data.component.css'],
})
export class FormTicketPersonDataComponent implements OnInit, OnChanges {
  recordFormOptions = RecordFormOptions;
  @Input() record = null;
  @Input() isDisabled = false;
  @Output() formChangeValid = new EventEmitter();
  personTicketDataForm: FormGroup;
  cities: Observable < string[] > ;
  locations: Observable < string[] > ;
  parishes: Observable < string[] > ;

  constructor(
    private formBuilder: FormBuilder,
    private recordService: RecordService,
    private dateTimeHelper: DateTimeHelper,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.initData();
  }

  ngOnInit(): void {
    this.formValidatorBuilder();
    this._initializeAutoCompleteFields()
    this.initData();
    this.personTicketDataForm.valueChanges.subscribe((value) => {
      this.formChangeValid.emit(this.personTicketDataForm);
    });
  }

  initData() {
    const { 
      parish,
      gender,
      location,
      city,
      person,
    } = this.record;
    const {
      name,
      lastName,
      secondLastName,
    } = person;
    const bornDate = this.dateTimeHelper.parseRercordDateToInputDateValue(this.record.bornDate);
    const formValue = {
      name,
      lastName,
      secondLastName,
      bornDate,
      parish,
      gender,
      location,
      city
    }
    this.personTicketDataForm.setValue(formValue);
    if (this.isDisabled) {
      this.personTicketDataForm.disable();
    }
  }

  formValidatorBuilder(): void {
    this.personTicketDataForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      secondLastName: ['', Validators.compose([Validators.required])],
      bornDate: ['', Validators.compose([Validators.required])],
      parish: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
    });
  }

  requiredFieldValidation(field) {
    return this.personTicketDataForm.get(field).invalid && this.personTicketDataForm.get(field).touched;
  }


  // PRIVATE METHODS
  private _filter(value: string, optionList: any): string[] {
    const filterValue = value.toLowerCase();
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _initializeAutoCompleteFields() {
    this.cities = this.personTicketDataForm.get(['city']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.cities))
      );

    this.locations = this.personTicketDataForm.get(['location']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.locations))
      );

    this.parishes = this.personTicketDataForm.get(['parish']).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.recordFormOptions.parishes))
      );


  }

}
