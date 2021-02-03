import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder;
  @Input() id;
  @Input() isDisabled = false;
  @Input() isRequired = false;

  @Output() modelChange = new EventEmitter();

  searchFormControl: FormControl;

  constructor() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.searchFormControl = new FormControl('', Validators.compose(validators));
  }

  ngOnInit() {}

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
