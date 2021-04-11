import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonDataService } from './shared/services/data/person-data.service';
import { UserDataService } from './shared/services/data/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isSigned: boolean;
  controlPanelModule: string;
  currentYear: number;

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {
    this.isSigned =  false;
    this.controlPanelModule = 'Inicio';
    this.currentYear = new Date().getFullYear();

    if (!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
  }
}
