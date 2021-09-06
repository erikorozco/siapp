import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnChanges {
  @Input() label = '';
  @Input() info = '';
  @Input() placeholder;
  @Input() id;
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() buttonType = 'submit';
  @Input() initalValue = '';

  @Output() modelChange = new EventEmitter();

  searchFormControl: FormControl;

  constructor() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.searchFormControl = new FormControl(this.initalValue, Validators.compose(validators));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.searchFormControl.setValue(this.initalValue);
  }

  search = () => {
    this.modelChange.emit(this.searchFormControl.value);
  }

  clear = () => {
    if (this.searchFormControl.value) {
      this.searchFormControl.setValue('');
      this.modelChange.emit(null);
    }
  }

}
