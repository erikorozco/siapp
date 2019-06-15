import { Component, OnInit, Inject } from '@angular/core';
import { RecordService } from '../../../../shared/services/record-service';
import { Router } from '@angular/router';
import { Therapist } from 'src/app/shared/models/therapist.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-records',
  templateUrl: './list-records-dialog.component.html',
  styleUrls: ['./list-records-dialog.component.css']
})
export class ListRecordsDialogComponent implements OnInit {

  params: any;
  records: any;
  tableProperties: any;
  therapist: Therapist;

  constructor(
    private recordService: RecordService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<ListRecordsDialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getAllRecords();
  }

  executeAction({value, action}) {
    switch (action) {
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

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
            || (`${element.recordPatientName.toLowerCase()} ${element.recordPatientLastName.toLowerCase()} ${element.recordPatientSecondLastName.toLowerCase()}`)
            .includes(searchText.toLowerCase())
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
