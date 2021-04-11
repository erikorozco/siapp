import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-multi-select',
  templateUrl: './input-multi-select.component.html',
  styleUrls: ['./input-multi-select.component.css']
})
export class InputMultiSelectComponent {
  @Input() label = '';
  @Input() info = '';
  @Input() keyValue = 'value';
  @Input() keyLabel = 'label';
  @Input() options: Array<any>;
  @Input() isDisabled = false;

  @Output() modelChange = new EventEmitter();
  multiSelectFormControl: FormControl;

  
  constructor() {
    this.multiSelectFormControl = new FormControl([]);
  }

  modelChangeEmiter = (option) => {
    this.modelChange.emit(this.multiSelectFormControl.value);
  }

}