import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from '../../../../shared/services/record-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  params: any;
  person: any;
  record: any;
  photoUrl: string;
  mySrc: any;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordService: RecordService,
    private toastr: ToastrService
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

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.error('Formato de archivo no compatible', 'Archivo invalido');
      return;
    } else if (file.size > 1000000) {
      this.toastr.error('Excede el tamaño. Max 10MB', 'Archivo invalido');
      return;
    }
    //this.photoUrl = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.photoUrl = reader.result;
  }

}
