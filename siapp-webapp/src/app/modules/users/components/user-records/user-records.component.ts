import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../../../../shared/services/therapist.service';
import { ActivatedRoute } from '@angular/router';
import { Therapist } from '../../../../shared/models/therapist.model';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {

  params: any;
  therapist: Therapist;

  constructor(
    private therapistServie: TherapistService,
    private routes: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getUrlParams();
    this.getTherapist();
  }

  getTherapist() {
    this.therapistServie.getTherapist(this.params.therapistId).subscribe( data => {
      this.therapist = data;
    }, error => {

    });
  }

  getUrlParams() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });
  }


}
