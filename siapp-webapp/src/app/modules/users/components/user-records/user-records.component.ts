import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../../../../shared/services/therapist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Therapist } from '../../../../shared/models/therapist.model';
import { RecordService } from '../../../../shared/services/record-service';
import { ListRecordsDialogComponent } from '../../../records/components/list-records-dialog/list-records-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


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
    private routes: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
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
          addModal: {
            text: 'Asignar Paciente',
            value: this.params
          }
        }
      }];
    }, error => {});
  }

  deleteRecordPermission(value) {

    const payload = {
      recordId: value.recordId,
      therapistId: this.params.therapistId
    };

    this.recordService.removeRecordPermission(payload).subscribe( data => {
      this.toastr.success('El paciente ha isdo desasignado exitosamente', 'Operacion exitosa');
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
      this.router.navigate(['home', 'user-records', this.params.therapistId, this.params.userId]));
    }, error => {});

  }

  assignRecord(value) {
    const dialogRef = this.dialog.open(ListRecordsDialogComponent, { width: '1000px'/*, data: {name: this.name, animal: this.animal}*/ });
    //dialogRef.componentInstance.data1 = value;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const record = Object.keys(result).map(k => result[k]);
        const payload = {
          recordId: record[0],
          therapistId: this.params.therapistId
        };

        this.recordService.assignRecord(payload).subscribe( data => {
          dialogRef.close();
          this.toastr.success('El paciente ha isdo asignado exitosamente', 'Operacion exitosa');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
          this.router.navigate(['home', 'user-records', this.params.therapistId, this.params.userId]));
        }, error => {
          console.log(error);
        });
      }
    });
  }

  executeAction({value, action}) {
    switch (action) {
      case 'view':
        this.router.navigate(['home', 'record-summary', value.personId]);
        break;
      case 'openAddModal':
        this.assignRecord(value);
        break;
      case 'delete':
        this.deleteRecordPermission(value);
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
