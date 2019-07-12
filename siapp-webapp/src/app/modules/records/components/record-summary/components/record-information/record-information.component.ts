import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/shared/models/record.model';
import { RecordService } from 'src/app/shared/services/record-service';

@Component({
  selector: 'app-record-information',
  templateUrl: './record-information.component.html',
  styleUrls: ['./record-information.component.css']
})
export class RecordInformationComponent implements OnInit {

  @Input() personInfo;
  personId: number;
  recordInfo: any;
  genogramSrc: string;

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
    this.personId = this.personInfo[0];
    this.getRecordInformation();
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.personId).subscribe(data => {
      if (data) {
        this.recordInfo = data;
        this.genogramSrc = 'data:image/png;base64,' + data.genogram;
        console.log(this.genogramSrc);
        // this.genogramSrc = data.genogram;
      }
    }, error => {
    });
  }

}
