import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isSigned =  false;
    this.controlPanelModule = 'Inicio';
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.getUserDetails();
  }

  // TO-DO: re implement this loigc with a service
  getUserDetails() {
    this.userService.getTokenDetails().subscribe((data) => {
      this.userDetails = data;
      this.authService.appendSession('user', data.therapistId);
      // if (data.roles.length === 1 && data.roles[0].name === 'USER') {
      //   this.router.navigate(['home', 'therapist-records', data.therapistId, data.userId]);
      // }
    });
  }

}
