import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-typeahead',
  templateUrl: './input-typeahead.component.html',
  styleUrls: ['./input-typeahead.component.css']
})
export class InputTypeaheadComponent implements OnInit, OnChanges {
  @Input() label = '';
  @Input() info = '';
  @Input() placeholder;
  @Input() id;
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() model: any;
  @Input() clearAfterSelection = false;
  @Input() optionsSource: Array<TypeAheadOptionList> = [];

  @Output() modelChange = new EventEmitter();

  options: Observable < string[] > ;
  typeAheadFormControl: FormControl;

  constructor() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.typeAheadFormControl = new FormControl('', Validators.compose(validators));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.model) {
      this.typeAheadFormControl.setValue(this.model.searchValue);
    }
  }

  ngOnInit() {
    this.options = this.typeAheadFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value, this.optionsSource)),
    );
  }

  filter(value: string, optionList: any): string[] {
    const filterValue = value.toLowerCase();
    return optionList.filter(option => option.searchValue.toLowerCase().includes(filterValue));
  }

  clear() {
    if (this.typeAheadFormControl.value) {
      this.typeAheadFormControl.setValue('');
      this.modelChange.emit(null);
    }
  }

  checkValidations() {
    let isInvalid = false;
    if (this.isRequired) {
      isInvalid = this.typeAheadFormControl.invalid && this.typeAheadFormControl.touched;
    }
    return isInvalid;
  }

  modelChangeEmiter = (option) => {
    this.modelChange.emit(option);
    if (this.clearAfterSelection) {
      this.typeAheadFormControl.setValue('');
    }
  }

}

type TypeAheadOptionList = {
  value?: any;
  label?: string;
  searchValue?: string;
}
