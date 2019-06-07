import { Component, OnInit, Inject } from '@angular/core';
import { RecordService } from '../../../../shared/services/record-service';
import { Router } from '@angular/router';
import { Therapist } from 'src/app/shared/models/therapist.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrls: ['./list-records.component.css']
})
export class AssignRecordComponent implements OnInit {

  params: any;
  records: any;
  tableProperties: any;
  therapist: Therapist;
  data: any;

  constructor(
    private recordService: RecordService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<AssignRecordComponent>,
  ) { }

  ngOnInit() {
    this.getAllRecords();
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
      therapistId: this.data.therapistId
    };

    this.recordService.assignRecord(payload).subscribe( data => {
      this.dialogRef.close();
      this.toastr.success('El paciente ha isdo asignado exitosamente', 'Operacion exitosa');
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
      this.router.navigate(['home', 'user-records', this.data.therapistId, this.data.userId]));
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
          assign: true
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
