import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() userProperties: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
