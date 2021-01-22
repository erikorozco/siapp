import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from '../../../../shared/services/record-service';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { PrivacyAgreementService } from 'src/app/shared/services/privacy-agreement.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  isLoading = false;
  isAdmin;
  userDetails;
  params: any;
  person: any;
  record: any;
  privacyAgreement: any;
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
    private authService: AuthService,
    private permissionService: PermissionService,
    private privacyAgreementService: PrivacyAgreementService,
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
    this.getPrivacyAgreement();
  }

  render(tab) {
    this.tab = tab;
  }

  getPersonInformation() {
    this.isLoading = true;
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = data;
      this.isLoading = false;
    }, error => {
      console.log(error);
    });
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.params.personId).subscribe(data => {
      this.record = data;
      if(data !== null)
        this.authService.appendSession('record', data.id);
    }, error => {
      console.log(error);
    });
  }

  getUserInformation() {
      this.userService.getTokenDetails().subscribe((data) => {
        this.isAdmin = this.permissionService.isAllowed(data.roles, this.authService.ADMIN_MODULES);
        this.userDetails = data;
      });
  }

  getPrivacyAgreement() {
    this.privacyAgreementService.getPrivacyAgreement(this.params.personId).subscribe((data) => {
      this.privacyAgreement = data;
    }, error => {
      console.log(error)
    });
  };

  viewPrivacyAgreement() {
    this.router.navigate(['home', 'privacy-agreement', this.params.personId]);
  }

}
