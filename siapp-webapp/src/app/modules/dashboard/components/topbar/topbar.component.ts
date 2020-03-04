import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() userDetails: any;
  firstName: string;
  lastName: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initializeUserInfo();
  }

  logout() {
    this.authService.logout();
  }

  initializeUserInfo() {
    this.firstName = this.userDetails.name;
    this.lastName = this.userDetails.lastName;
  }

}
