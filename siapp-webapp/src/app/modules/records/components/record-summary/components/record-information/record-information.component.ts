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
  @Input() isAdmin;
  recordInfo: any;
  panelOpenState = false;

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
      console.log(error);
    });
  }

  calculateAge(recordBornDate) {
    const bornDate = new Date(recordBornDate);
    const currentDate = new Date();
    return currentDate.getFullYear() - bornDate.getFullYear();
  }

  getBMIStatus(bmi) {
      if ( bmi > 30 ) {
        return  'Obesidad';
      } else if ( bmi > 25 && bmi < 29.99 ) {
         return  'Sobrepeso';
      } else if ( bmi > 18.5 && bmi < 24.99 ) {
         return  'Peso saludable';
      } else if ( bmi < 18.5) {
        return  'Bja peso';
      }
  }

}
