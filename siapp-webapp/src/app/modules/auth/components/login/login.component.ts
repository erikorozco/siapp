import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loginHandler = new EventEmitter ();

  constructor() { }

  login($event) {
    this.loginHandler.emit($event);
  }

}
