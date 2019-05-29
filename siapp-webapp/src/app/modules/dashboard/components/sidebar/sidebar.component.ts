import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roles: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.findUserByName(window.sessionStorage.getItem('username')).subscribe(data => {
      this.roles = JSON.stringify(data.roles);
    }, error => {});
  }

}
