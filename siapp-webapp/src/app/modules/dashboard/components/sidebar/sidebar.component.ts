import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roles: string;
  @Input() userDetails: any;

  constructor() { }

  ngOnInit() {
    this.roles = JSON.stringify(this.userDetails.roles);
  }

}
