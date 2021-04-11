import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-list-persons-dialog',
  templateUrl: './list-persons-dialog.component.html',
  styleUrls: ['./list-persons-dialog.component.css']
})
export class ListPersonsDialogComponent implements OnInit {

  params: any;
  persons: any;
  tableProperties: any;

  constructor(
    private personService: PersonService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<ListPersonsDialogComponent>,
  ) { }

  ngOnInit() {
    this.initTable();
  }

  executeAction({value, action}) {
    switch (action) {
      case 'search':
        this.filterPersons(value);
        break;
      default:
        console.log(`${action} is not a valid option`);
        break;
    }
  }

  filterPersons(searchText) {
    this.personService.filterPersons(searchText).subscribe((data) => {
      this.persons = data;
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Teléfono', '# Expediente', 'Acciones'],
          datasource: this.persons,
          maxVisibleItems: 10,
          filterFunction : this.parsePersons,
          tableActions: {
            formSearch : true,
            assign: true
          }
      }];
    }, (error) => {
      console.log(error);
    });
  }

  initTable() {
      this.persons = {};
      this.tableProperties = [{
          headElements: ['Nombre', 'Apellidos', 'Teléfono', '# Expediente', 'Acciones'],
          datasource: [],
          maxVisibleItems: 10,
          filterFunction : () => {return []},
          tableActions: {
            formSearch : true,
            assign: true
          }
      }];
  }

  parsePersons(data, searchText) {
    return data.map((p) => {
      let person = {
        ...p,
        tableFields: [
          p.name,
          p.lastName + ' ' + p.secondLastName,
          p.phone,
          p.recordId,
        ]
      }
      return person;
    });
  }

}
