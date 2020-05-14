import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormPsycometricManagementService } from 'src/app/shared/services/form-psycometric-management.service';

@Component({
  selector: 'app-list-psycometric-management-dialog',
  templateUrl: './list-psycometric-management-dialog.component.html',
  styleUrls: ['./list-psycometric-management-dialog.component.css']
})
export class ListPsycometricManagementDialogComponent implements OnInit {

  psycometricConfigs: any;
  tableProperties: any;

  constructor(
    private formPsycometricManagementService: FormPsycometricManagementService,
    public dialogRef: MatDialogRef<ListPsycometricManagementDialogComponent>,
  ) { }

  ngOnInit() {
    this.getPsycometricConfigs()
  }

  getPsycometricConfigs() {
    this.formPsycometricManagementService.getAllActive().subscribe(data => {
      this.psycometricConfigs = data;
      this.tableProperties = [{
          headElements: ['Tipo de prueba', 'Descripción', 'Acciones'],
          datasource: data,
          maxVisibleItems: 10,
          filterFunction : this.filter,
          tableActions: {
            assign: true,
          }
      }];
    }, error => {
      console.log(error);
    });
  }

  executeAction({value, action}) {
    switch (action) {
      default:
        console.log(`${action} is not a valid option`);
        break;
    }

  }

  filter(previousElements, searchText) {
    return previousElements.filter(
      element => {
        if (element.name.toLowerCase().includes(searchText.toLowerCase())) {
              element.tableFields = [
                element.name,
                element.description
              ];
              return element;
            }
      }
    );
  }

}
