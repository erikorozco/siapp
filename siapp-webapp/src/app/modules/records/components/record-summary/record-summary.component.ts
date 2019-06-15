import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  params: any;

  constructor(
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });
  }

  viewPrivacyAgreement() {
    this.router.navigate(['home', 'privacy-agreement', this.params.personId]);
  }

}
