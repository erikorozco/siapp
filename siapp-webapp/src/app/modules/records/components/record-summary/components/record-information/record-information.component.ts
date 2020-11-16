import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/app/shared/models/record.model';
import { RecordService } from 'src/app/shared/services/record-service';
import { DerivationService } from 'src/app/shared/services/derivation.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

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
  derivations;
  recordVersion;

  constructor(
    private recordService: RecordService,
    private derivationService: DerivationService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getRecordInformation();
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.personId).subscribe(data => {
      if (data) {
        this.recordInfo = data;
        this.recordVersion = data.version;
        
        if (this.recordVersion == 2) {
          this.derivationService.getDerivationByRecordId(data.id).subscribe((data) => {
            this.derivations = data;
          });
        }

      }
    }, error => {
      console.log(error);
    });
  }

  calculateAge(recordBornDate) {
    const bornDate = new Date(recordBornDate);
    const currentDate = new Date();
    const a = currentDate.getFullYear() - bornDate.getFullYear()
    let months = (a * 12) + (currentDate.getMonth() - bornDate.getMonth()) ;
    return Math.floor(months/12)
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
