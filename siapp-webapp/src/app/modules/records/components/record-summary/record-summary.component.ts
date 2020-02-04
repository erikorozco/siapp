import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from '../../../../shared/services/record-service';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  params: any;
  person: any;
  record: any;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordService: RecordService,
  ) { }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });

    this.getPersonInformation();
    this.getRecordInformation();
  }

  getPersonInformation() {
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = data;
    }, error => {
      console.log(error);
    });
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.params.personId).subscribe(data => {
      this.record = data;
    }, error => {
      console.log(error);
    });
  }

  viewPrivacyAgreement() {
    this.router.navigate(['home', 'privacy-agreement', this.params.personId]);
  }

}
