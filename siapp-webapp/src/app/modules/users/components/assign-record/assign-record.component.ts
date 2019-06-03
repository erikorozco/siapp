import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../../../shared/services/record-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapistService } from 'src/app/shared/services/therapist.service';
import { Therapist } from 'src/app/shared/models/therapist.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assign-record',
  templateUrl: './assign-record.component.html',
  styleUrls: ['./assign-record.component.css']
})
export class AssignRecordComponent implements OnInit {

  params: any;
  records: any;
  tableProperties: any;
  therapist: Therapist;

  constructor(
    private therapistServie: TherapistService,
    private recordService: RecordService,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUrlParams();
    this.getTherapist();
    this.getAllRecords();
  }

  getUrlParams() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });
  }

  getTherapist() {
    this.therapistServie.getTherapist(this.params.therapistId).subscribe( data => {
      this.therapist = data;
    }, error => {});
  }

  executeAction({value, action}) {
    switch (action) {
      case 'assign':
        this.assignRecord(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  assignRecord(value) {
    const payload = {
      recordId: value.recordId,
      therapistId: this.params.therapistId
    };

    this.recordService.assignRecord(payload).subscribe( data => {
      this.toastr.success('El paciente ha isdo asignado exitosamente', 'Operacion exitosa');
      this.router.navigate(['home', 'users']);
    }, error => {});
  }

  getAllRecords() {
    this.recordService.getAllRecords().subscribe( data => {
      this.records = data;
      this.tableProperties = [{
        headElements: ['No. Expediente', 'Nombre', 'Apellidos', 'Estado', 'Acciones'],
        datasource: data,
        maxVisibleItems: 10,
        filterFunction : this.filterRecords,
        tableActions: {
          view: false,
          edit: false,
          delete: false,
          print: false,
          updateStatus: false,
          assign: true,
          // add: {
          //   route: ['/home', 'assign-record', this.params.therapistId],
          //   text: 'Asignar Paciente'
          // }
        }
      }];
    }, error => {});
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
