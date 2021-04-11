import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputSelectComponent implements OnInit {
  @Input() label = '';
  @Input() info = '';
  @Input() keyValue = 'value';
  @Input() keyLabel = 'label';
  @Input() options: Array<any>;
  @Input() isDisabled = false;

  @Output() modelChange = new EventEmitter();
  @Input() selectedValue = ''

  constructor() { }

  ngOnInit() {
  }

  modelChangeEmiter = (option) => {
    this.modelChange.emit(option);
  }

}
