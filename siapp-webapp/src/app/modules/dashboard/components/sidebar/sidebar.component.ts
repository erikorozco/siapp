import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userDetails;
  isSidebarToggled;

  constructor(
    private permissionService: PermissionService,
    private userService: UserService,
  ) {
    this.isSidebarToggled = false;
  }

  ngOnInit() {
  }

  toggleSidebar(isSidebarToggled) {
    this.isSidebarToggled = !isSidebarToggled;
  }

}
