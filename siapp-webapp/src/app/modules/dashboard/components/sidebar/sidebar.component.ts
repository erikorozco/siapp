import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() userDetails: any;
  isAdmin;
  isAdministrative;
  isSidebarToggled;

  constructor(
    private authService: AuthService
  ) {
    this.isSidebarToggled = false;
  }

  ngOnInit() {
    this.isAdministrative = this.authService.isAllowed(this.userDetails.roles, this.authService.RECEPTION_MODULE);
    this.isAdmin = this.authService.isAllowed(this.userDetails.roles, this.authService.ADMIN_MODULES);
  }

  toggleSidebar(isSidebarToggled) {
    this.isSidebarToggled = !isSidebarToggled;
  }

}
