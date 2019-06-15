import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit, AfterViewInit{


  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Output() getSign = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }

  signaturePadOptions: Object = { 
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300
  };


  ngOnInit() {
  }

  drawComplete() {
    //console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  captureSign = (action) => {
    if (action === 'clean') {
      this.signaturePad.clear();
    } else {
      this.getSign.emit({
        value: this.signaturePad.toDataURL()
      });
    }

  }

}
