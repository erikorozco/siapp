import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sessions-summary',
  templateUrl: './sessions-summary.component.html',
  styleUrls: ['./sessions-summary.component.css']
})
export class SessionsSummaryComponent implements OnInit {

  @Input() personId;
  @Input() recordId;
  @Input() isAdmin;

  constructor() { }

  ngOnInit() {
  }

}
