import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() userProperties: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

}
