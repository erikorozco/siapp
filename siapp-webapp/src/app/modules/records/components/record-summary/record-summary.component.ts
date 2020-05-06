import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from '../../../../shared/services/record-service';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  isAdmin;
  userDetails;
  params: any;
  person: any;
  record: any;
  photoFile: any;
  photoSrc: any;
  loading = false;
  tab: string;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordService: RecordService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.tab = 'home-tab';
  }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });

    this.getPersonInformation();
    this.getRecordInformation();
    this.getUserInformation();
  }

  render(tab) {
    this.tab = tab;
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
      console.log(data);
      this.record = data;
      if(data !== null)
        this.authService.appendSession('record', data.id);
    }, error => {
      console.log(error);
    });
  }

  getUserInformation() {
      this.userService.getTokenDetails().subscribe((data) => {
        this.isAdmin = this.authService.isAllowed(data.roles, this.authService.ADMIN_MODULES);
        this.userDetails = data;
      });
  }

  viewPrivacyAgreement() {
    this.router.navigate(['home', 'privacy-agreement', this.params.personId]);
  }

}
