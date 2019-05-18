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

  @Input() userId: number;
  firstName: string;
  lastName: string;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.findUserByName(window.sessionStorage.getItem('username')).subscribe(data => {
      this.firstName = data.therapist.name;
      this.lastName = data.therapist.last_name;
    }, error => {

    });
  }

  logout() {
    this.authService.logout();
  }

}
