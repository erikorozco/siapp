import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roles: string;
  session: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
    // this.getSession();
  }

  getSession() {
    console.log(this.authService.getSession());
  }

  getUser() {
    this.userService.findUserByName(window.sessionStorage.getItem('username')).subscribe(data => {
      this.roles = JSON.stringify(data.roles);
    }, error => {
      console.log(error);
    });
  }

}
