import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isSigned: boolean;
  controlPanelModule: string;
  currentYear: number;

  constructor(private router: Router) {
    this.isSigned =  false;
    this.controlPanelModule = 'Inicio';
    this.currentYear = new Date().getFullYear();

    if (!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
  }


}
