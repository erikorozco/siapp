import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isSigned: boolean;
  controlPanelModule: string;
  currentYear: number;

  constructor() {
    this.isSigned =  false;
    this.controlPanelModule = 'Inicio';
    this.currentYear = new Date().getFullYear();
  }

  doLogin($event) {
    this.isSigned = true;
  }


}
