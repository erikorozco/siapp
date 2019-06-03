import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../../../../shared/services/therapist.service';
import { ActivatedRoute } from '@angular/router';
import { Therapist } from '../../../../shared/models/therapist.model';
import { RecordService } from '../../../../shared/services/record-service';


@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {

  params: any;
  therapist: Therapist;
  records: any;
  tableProperties: any;

  constructor(
    private therapistServie: TherapistService,
    private recordService: RecordService,
    private routes: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getUrlParams();
    this.getTherapist();
    this.getRecords();
  }

  getTherapist() {
    this.therapistServie.getTherapist(this.params.therapistId).subscribe( data => {
      this.therapist = data;
    }, error => {});
  }

  getUrlParams() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });
  }

  getRecords() {
    this.recordService.getRecordsByTherapistId(this.params.therapistId).subscribe(data => {
      this.records = data;
      this.tableProperties = [{
        headElements: ['No. Expediente', 'Nombre', 'Apellidos', 'Estado', 'Acciones'],
        datasource: data,
        maxVisibleItems: 10,
        filterFunction : this.filterRecords,
        tableActions: {
          view: true,
          edit: false,
          delete: true,
          print: false,
          updateStatus: false,
          add: {
            route: ['/home', 'assign-record', this.params.therapistId],
            text: 'Asignar Paciente'
          }
        }
      }];
    }, error => {});
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
      console.log(value);
        // this.viewUser(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filterRecords(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.recordPatientName.toLowerCase().includes(searchText.toLowerCase())
            || element.recordPatientLastName.toLowerCase().includes(searchText.toLowerCase())
            || element.recordPatientSecondLastName.toLowerCase().includes(searchText.toLowerCase())
            || element.recordStatus.toLowerCase().includes(searchText.toLowerCase())
            || element.recordId.toString().includes(searchText)
            ) {
              element.tableFields = [
                element.recordId,
                element.recordPatientName,
                element.recordPatientLastName + ' ' + element.recordPatientSecondLastName,
                element.recordStatus
              ];
              return element;
            }
      }
    );
  }


}
