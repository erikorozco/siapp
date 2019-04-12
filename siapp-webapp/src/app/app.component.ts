import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isSigned = true;

  constructor() {

  }

  doLogin($event) {
    console.log("el fer es una tola pero me la chupa");
    this.isSigned = true;
  }


}
