import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/shared/models/record.model';
import { RecordService } from 'src/app/shared/services/record-service';

@Component({
  selector: 'app-record-information',
  templateUrl: './record-information.component.html',
  styleUrls: ['./record-information.component.css']
})
export class RecordInformationComponent implements OnInit {

  @Input() personId;
  recordInfo: any;

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
    this.getRecordInformation();
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.personId).subscribe(data => {
      if (data) {
        this.recordInfo = data;
      }
    }, error => {
    });
  }

}
