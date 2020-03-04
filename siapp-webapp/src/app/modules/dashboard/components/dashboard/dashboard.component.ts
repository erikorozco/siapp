import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSigned: boolean;
  controlPanelModule: string;
  currentYear: number;
  userDetails: any;

  constructor(
    private userService: UserService
  ) {
    this.isSigned =  false;
    this.controlPanelModule = 'Inicio';
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getTokenDetails().subscribe((data) => {
       this.userDetails = data;
    });
  }

}
