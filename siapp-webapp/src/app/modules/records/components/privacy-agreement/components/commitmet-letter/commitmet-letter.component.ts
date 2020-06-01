import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commitmet-letter',
  templateUrl: './commitmet-letter.component.html',
  styleUrls: ['./commitmet-letter.component.css']
})
export class CommitmetLetterComponent implements OnInit {

  @Input() recordId;
  @Input() dateTime;

  time: any;
  day: any;
  month: any;
  year: any;

  constructor() { }

  ngOnInit() {

    this.time = `${this.dateTime.getHours()}:${this.dateTime.getMinutes() < 10? '0' : '' }${this.dateTime.getMinutes()}`;
    this.day = this.dateTime.getDate();
    this.month = this.dateTime.getMonth() + 1;
    this.year = this.dateTime.getFullYear();

  }

}
